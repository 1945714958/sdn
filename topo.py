#!/usr/bin/env python
# 这里的代码是将MiniEdit导出的Python文件基础上做修改
import sys
import json

import mininet.clean
from mininet.net import Mininet
from mininet.topo import Topo
from mininet.node import Controller, RemoteController, OVSController
from mininet.node import CPULimitedHost, Host, Node
from mininet.node import OVSKernelSwitch, UserSwitch
from mininet.log import setLogLevel, info
from bottle import route, run, template, get, post
from mininet.link import TCLink


# 引入bottle,可以简单的提供回应http的api
mininet = Mininet(topo=None,
                  build=False,
                  ipBase='10.0.0.0/8')

info('*** Adding controller\n')
# ryu控制器
c0 = mininet.addController(name='c0',
                           controller=RemoteController,
                           ip='127.0.0.1',
                           protocol='tcp',
                           port=6633)


# 添加交换机和网络对象
sw = []


@route('/hello')
def hello():
    return "Hello!"


# 删除主机的接口，用<变量名>即可传参
# 比如/api/deletehost/h1即为删h1


@route('/api/delhost/<host>')
def delete_host(host):
    #     net.get可以根据字符串也就是名字获取主机对象
    #     这里做了一个嵌套
    #     下同
    mininet.delHost(mininet.get(host))
    return "ok"


@route('/api/delswitch/<switch>')
# 删除交换机的接口
def delete_switch(switch):
    mininet.delSwitch(mininet.get(switch))
    sw.remove(switch)


@route('/api/addlink/<host>/<switch>')
# 增加链路的接口,增加两个参数并将他们连接
def addlink(host, switch):
    host = mininet.get(host)
    switch = mininet.get(switch)
    link = mininet.addLink(host, switch)
    ip = "10.0.0." + str(mininet.nextIP)
    host.setIP(ip)
    cmd = "ifconfig " + link.intf1.name + " " + ip
    host.cmd(cmd)
    switch.attach(link.intf2.name+"")
    return "ok"


@route('/api/addswitch/<switch>')
# 添加交换机的接口,传入交换机名
def addswitch(switch):
    data = {}
    global c0
    #     把最开始定义的控制器对象，即为c0引进来用
    name = mininet.addSwitch(switch).name
    sw.append(switch)
    data["name"] = name
    return data


#     把新增的控制器连上c0

@route('/api/dellink/<node1>/<node2>')
def dellink(node1, node2):
    mininet.delLinkBetween(mininet.get(node1), mininet.get(node2))
    return "ok"


@route('/api/pingall')
def pingAll():
    result = mininet.pingAll()
    return  {"dropped":result}


@route("/api/test/addhost")
def addHost():
    host = mininet.addHost("h4")
    switch = mininet.get("s1")
    link = mininet.addLink(host,switch)
    ip = "10.0.0." + str(mininet.nextIP)
    cmd = "ifconfig " + link.intf1.name + " " + ip
    # host.cmd(cmd)
    switch.attach(link.intf2.name+"")
    result = {}
    result["name"] = host.name
    host.setIP(ip)

    return result

@route("/api/addhost/<host>")
def addhost(host):
    data = {}
    host = mininet.addHost(host)
    data["name"] = host.name
    return data

@route("/api/lastcmd/<node>")
def lastCmd(node):
    data = {}
    node = mininet.get(node)
    result = node.lastCmd
    data["name"] = node.name
    data["lastcmd"] = result
    return data


@route('/api/hosts')
def hosts():
    hosts = mininet.hosts
    data = {}
    for host in hosts:
        params = {}
        params["ip"]= host.params["ip"]
        params["pid"] = host.pid   
        params["mac"] = host.intfs[0].mac 
        params["intfsName"] = host.intfs[0].name
        print(params)
        data[host.name] = params
    return data


@route('/api/links')
def links():
    links = mininet.links
    index = 1
    data = {}
    for link in links:
        d = {}
        intf1 = {} 
        intf2 = {} 
        intf1["name"] = link.intf1.name
        intf1["node"] = link.intf1.node.name
        intf1["ip"] = link.intf1.ip
        intf1["mac"] = link.intf1.mac
        intf2["name"] = link.intf2.name
        intf2["node"] = link.intf2.node.name
        intf2["ip"] = link.intf2.ip
        intf2["mac"] = link.intf2.mac
        d["intf1"] = intf1
        d["intf2"] = intf2
        data["link"+str(index)] = d
        index+=1
    return data


@route("/api/dpid/<switch>")
def getdpid(switch):
    switch = mininet.get(switch)
    result = {}
    result["switch"] = switch.name
    result["dpid"] = int(switch.dpid)
    return result

@route('/api/switches')
def switches():
    switches = mininet.switches
    data = {}
    for switch in switches:
        params = {}
        params["dpid"] = int(switch.dpid)
        params["pid"] = switch.pid
        intfs = [] 
        for key in switch.intfs:
            print(key)
            intf = {}
            intf["name"] = switch.intfs[key].name
            intf["mac"] = switch.intfs[key].mac
            intf["ip"] = switch.intfs[key].ip
            intfs.append(intf)
        params["intfs"] = intfs
        print(params)
        data[switch.name] = params
    return data


@route('/api/pingallfull')
def pingAllFull():
    result = mininet.pingAllFull()
    data = []
    for i in range(len(result)):
        d = {
            "hosts": [str(result[i][0]), str(result[i][1])],
            "rtt": {
                "send": result[i][2][0],
                "accept": result[i][2][1],
                "min": result[i][2][2],
                "avg": result[i][2][3],
                "max": result[i][2][4],
                "mdev": result[i][2][5],
            }
        }
        data.append(d)
    return {"data": data}




@route('/api/server')
def server():
    h2 = mininet.get("h2")
    result = h2.cmd("python3 /home/ytk/server.py &")
    print(result)
    return result


@route('/api/client/<host>')
def client(host):
    host = mininet.get(host)
    ip = host.IP()
    cmd = "python3 -c 'import clientsecModel as cl;cl.setLocalIp(\""+ip+"\");cl.run()'"
    print(cmd)
    result = host.cmd(cmd)
    print(result)
    return result


@route('/api/ifconfig/<node>')
def test(node):
    node = mininet.get(node)
    data = {}
    result = node.intfs[0].ifconfig()
    data["name"] = node.name
    data["ifconfig"] = result
    return data



@route('/api/ip/<host>')
def IP(host):
    data = {}
    host = mininet.get(host)
    data["host"] = host.name
    data["ip"] = host.IP()
    return data


@route('/api/mac/<host>')
def MAC(host):
    data = {}
    host = mininet.get(host)
    data["host"] = host.name
    data["mac"] = host.MAC()
    return data


"""TwoWayTopology

Four switches in a ring topology with two host connected at opposite sides of the ring:
            /--- s2 ---\
  h1 --- s1              s4 --- h2
            \--- s3 ---/
Adding the 'topos' dict with a key/value pair to generate our newly defined
topology enables one to pass in '--topo=mytopo' from the command line.
"""

@route('/api/sdp_topo')
def start_ryu_topo():
    # 把默认的各种交换机和拓扑加入并连接
    global c0

    info('*** Add switches\n')

    # Add hosts and switches
    info('*** Add hosts\n')
    leftHost = mininet.addHost('h1', ip='10.0.0.1', defaultRoute=None)
    rightHost = mininet.addHost('h2', ip='10.0.0.2', defaultRoute=None)
    leftHost2 = mininet.addHost('h3', ip='10.0.0.3', defaultRoute=None)

    info('*** Add switches\n')
    leftSwitch = mininet.addSwitch('s1', cls=OVSKernelSwitch)
    upSwitch = mininet.addSwitch('s2', cls=OVSKernelSwitch)
    downSwitch = mininet.addSwitch('s3', cls=OVSKernelSwitch)
    rightSwitch = mininet.addSwitch('s4', cls=OVSKernelSwitch)

    sw.append('s1')
    sw.append('s2')
    sw.append('s3')
    sw.append('s4')

    # Add links
    info('*** Add links\n')
    mininet.addLink(leftHost, leftSwitch, cls=TCLink, bw=20)
    mininet.addLink(leftHost2, leftSwitch, cls=TCLink, bw=20)
    mininet.addLink(leftSwitch, upSwitch, cls=TCLink, bw=10)
    mininet.addLink(leftSwitch, downSwitch, cls=TCLink, bw=10)
    mininet.addLink(upSwitch, rightSwitch, cls=TCLink, bw=10)
    mininet.addLink(downSwitch, rightSwitch, cls=TCLink, bw=10)
    mininet.addLink(rightSwitch, rightHost, cls=TCLink, bw=20)

    return "ok"

@route('/api/firststart')
# 第一次启动拓扑的接口
def start_first_net():
    global c0
    info('*** Starting controllers\n')
    for controller in mininet.controllers:
        controller.start()
    # 开控制器
    for i in sw:
        mininet.get(i).start([c0])
    info('*** Starting network\n')
    mininet.build()
    #     拓扑建立
    mininet.pingAll()
    return "ok"


if __name__ == "__main__":
    # run是bottle的运行函数。这里是指定了端口号和运行地址，这里写了个2345，前端也是写了2345
    run(host='0.0.0.0', port=2345)
