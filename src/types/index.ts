// 定义一个基础的分类数据结构
export interface CategoryDTO {
    id: string;
    code: string; // 例如 "I", "II" 或 "85"
    name: string;
    // 首页只需要展示简单的图标或描述，这里我们可以根据 code 映射图标
    sectionId?: string;
}