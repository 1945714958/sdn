/* eslint-disable prettier/prettier */
/**
 * menu
 */
export const munuRouters: Menu.MenuOptions[] = [
	{
		path: "/home/index",
		name: "home",
		component: "/home/index",
		meta: {
			icon: "HomeFilled",
			title: "首页",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: true,
			isKeepAlive: true
		}
	},
	{
		path: "/mininet/index",
		name: "mininet",
		component: "/mininet/index",
		meta: {
			icon: "HomeFilled",
			title: "操作面板",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: true,
			isKeepAlive: true
		}
	},
	{
		path: "/topo/index",
		name: "topo",
		component: "/topo/index",
		meta: {
			icon: "HomeFilled",
			title: "topo",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: true,
			isKeepAlive: true
		}
	},
	{
		path: "/dataScreen",
		name: "dataScreen",
		component: "/dataScreen/index",
		meta: {
			icon: "Histogram",
			title: "数据大屏",
			isLink: "",
			isHide: false,
			isFull: true,
			isAffix: false,
			isKeepAlive: true
		}
	},
	{
		path: "/assembly",
		name: "assembly",
		redirect: "/assembly/guide",
		meta: {
			icon: "Briefcase",
			title: "常用组件",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: false,
			isKeepAlive: true
		},
		children: [
			{
				path: "/assembly/guide",
				name: "guide",
				component: "/assembly/guide/index",
				meta: {
					icon: "Menu",
					title: "引导页",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/selectIcon",
				name: "selectIcon",
				component: "/assembly/selectIcon/index",
				meta: {
					icon: "Menu",
					title: "图标选择器",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/selectFilter",
				name: "selectFilter",
				component: "/assembly/selectFilter/index",
				meta: {
					icon: "Menu",
					title: "分类筛选器",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/treeFilter",
				name: "treeFilter",
				component: "/assembly/treeFilter/index",
				meta: {
					icon: "Menu",
					title: "树形筛选器",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/svgIcon",
				name: "svgIcon",
				component: "/assembly/svgIcon/index",
				meta: {
					icon: "Menu",
					title: "SVG 图标",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/uploadFile",
				name: "uploadFile",
				component: "/assembly/uploadFile/index",
				meta: {
					icon: "Menu",
					title: "文件上传",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/batchImport",
				name: "batchImport",
				component: "/assembly/batchImport/index",
				meta: {
					icon: "Menu",
					title: "批量添加数据",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/wangEditor",
				name: "wangEditor",
				component: "/assembly/wangEditor/index",
				meta: {
					icon: "Menu",
					title: "富文本编辑器",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/assembly/draggable",
				name: "draggable",
				component: "/assembly/draggable/index",
				meta: {
					icon: "Menu",
					title: "拖拽组件",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			}
		]
	},
	{
		path: "/dashboard",
		name: "dashboard",
		redirect: "/dashboard/dataVisualize",
		meta: {
			icon: "Odometer",
			title: "Dashboard",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: false,
			isKeepAlive: true
		},
		children: [
			{
				path: "/dashboard/dataVisualize",
				name: "dataVisualize",
				component: "/dashboard/dataVisualize/index",
				meta: {
					icon: "Menu",
					title: "数据可视化",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/dashboard/embedded",
				name: "embedded",
				component: "/dashboard/embedded/index",
				meta: {
					icon: "Menu",
					title: "内嵌页面",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			}
		]
	},
	{
		path: "/echarts",
		name: "echarts",
		redirect: "/echarts/waterChart",
		meta: {
			icon: "TrendCharts",
			title: "Echarts",
			isLink: "",
			isHide: false,
			isFull: false,
			isAffix: false,
			isKeepAlive: true
		},
		children: [
			{
				path: "/echarts/waterChart",
				name: "waterChart",
				component: "/echarts/waterChart/index",
				meta: {
					icon: "Menu",
					title: "水型图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/echarts/columnChart",
				name: "columnChart",
				component: "/echarts/columnChart/index",
				meta: {
					icon: "Menu",
					title: "柱状图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/echarts/lineChart",
				name: "lineChart",
				component: "/echarts/lineChart/index",
				meta: {
					icon: "Menu",
					title: "折线图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/echarts/pieChart",
				name: "pieChart",
				component: "/echarts/pieChart/index",
				meta: {
					icon: "Menu",
					title: "饼图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/echarts/radarChart",
				name: "radarChart",
				component: "/echarts/radarChart/index",
				meta: {
					icon: "Menu",
					title: "雷达图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			},
			{
				path: "/echarts/nestedChart",
				name: "nestedChart",
				component: "/echarts/nestedChart/index",
				meta: {
					icon: "Menu",
					title: "嵌套环形图",
					isLink: "",
					isHide: false,
					isFull: false,
					isAffix: false,
					isKeepAlive: true
				}
			}
		]
	}
];
