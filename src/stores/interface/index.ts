import { DataSet } from "vis-data/peer";

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: any;
	assemblySize: AssemblySizeType;
	language: string;
	themeConfig: ThemeConfigProps;
}

/* themeConfigProp */
export interface ThemeConfigProps {
	maximize: boolean;
	layout: LayoutType;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isCollapse: boolean;
	isWeak: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
}

export type AssemblySizeType = "default" | "small" | "large";

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}

/* AuthState */
export interface AuthState {
	routeName: string;
	authButtonList: {
		[key: string]: string[];
	};
	authMenuList: Menu.MenuOptions[];
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[];
}
export interface MininetState {
	isImport: boolean;
}

export type Host = {
	label?: string;
	name: string;
	ip: string;
	pid: number;
	mac: string;
	intfsName: string;
};
export type Hosts = {
	[key: string]: Host;
};
export type Intf = {
	name: string;
	mac: string;
	ip: string;
};
export type Switch = {
	label?: string;
	name: string;
	pid: number;
	intfs: Intf[];
};
export type Switches = {
	[key: string]: Switch;
};

type LinkNode = {
	name: string;
	node: string;
	ip: string;
	mac: string;
};

export type Link = {
	name: string;
	intf1: LinkNode;
	intf2: LinkNode;
};

export type links = {
	[key: string]: Link;
};
export interface TopoState {
	stack: Array<any>;
	deleteStack: Array<any>;
	editBool: Boolean;
	Hosts: Hosts;
	Switches: Switches;
	Links: links;
	currentHost: Host;
	currentSwitch: Switch;
	currentPort: {
		name: string;
		label?: string;
		mac?: string;
	};
	nodes: DataSet<{
		id: any;
		label: string;
		group: string;
		x?: number;
		y?: number;
		name?: string;
		pid?: number;
		dpid?: number;
		intfs?: Intf[];
		ip?: string;
		mac?: string;
		intfsName?: string;
	}>;
	edges: DataSet<{ id: any; from: any; to: any }>;
}
