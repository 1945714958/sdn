import { ElMessage } from "element-plus";
import { form } from "@/api/interface/form";

/**
 * @param device 操作
 * @param form 表单
 * @param api 接口
 */
export function Operation(device: string, form: form, api: Function) {
	api(form)
		.then(() => {
			ElMessage.success(device + "成功！");
		})
		.catch(() => {
			ElMessage.error(device + "失败！");
		});
}
