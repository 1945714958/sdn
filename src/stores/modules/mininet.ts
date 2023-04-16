import { defineStore } from "pinia";
import { MininetState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
export const MininetStore = defineStore({
	id: "MininetStore",
	state: (): MininetState => ({
		isImport: false
	}),
	getters: {
		isImportGet: state => state.isImport
	},
	actions: {
		setIsImport() {
			this.isImport = true;
		}
	},
	persist: piniaPersistConfig("MininetStore")
});
