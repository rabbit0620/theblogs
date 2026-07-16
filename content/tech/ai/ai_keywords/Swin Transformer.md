---
title: "Swin Transformer"
date: 2026-05-06T00:00:00+08:00
draft: false
---

# Swin Transformer

Parent: [ai_keywords]({{< ref "ai_keywords" >}})

### Swin Transformer

#### 【核心定义】

Swin Transformer（Shifted Window Transformer）是一种面向计算机视觉任务的分层视觉Transformer架构，由微软研究院于2021年提出。它通过引入**移动窗口自注意力机制**和**分层特征金字塔**，在保持Transformer全局建模能力的同时，显著降低了计算复杂度（与图像尺寸呈线性关系），使其在图像分类、目标检测、语义分割等任务中均达到或超越CNN（如ResNet、EfficientNet）的性能。

---

#### 【关键技术点】

1. **分层特征图（Hierarchical Feature Maps）**  
   - 不同于ViT的固定单分辨率输出，Swin Transformer通过连续的Patch Merging操作（类似CNN的池化）生成多尺度特征图，便于下游任务（如分割、检测）直接利用金字塔结构。

2. **移动窗口自注意力（Shifted Window Multi-head Self-Attention, SW-MSA）**  
   - 将图像划分为非重叠的局部窗口，在每个窗口内计算自注意力；相邻层通过窗口移动（shift）实现跨窗口信息交互，既保留了局部归纳偏置，又避免了全局自注意力的二次复杂度。

3. **相对位置偏置（Relative Position Bias, RPB）**  
   - 在注意力计算中引入可学习的相对位置编码，使得模型对空间位置敏更感，从而弥补窗口内缺乏绝对位置信息的不足。

4. **高效计算与可扩展性**  
   - 窗口自注意力的复杂度为 \(O(N \times M^2)\)（\(N\)为patches总数，\(M\)为窗口大小），远低于标准自注意力的\(O(N^2)\)，使其能高效处理高分辨率输入（如医学影像）。

---

#### 【医学/神经科学应用场景】

**脑卒中MRI病灶自动分割（首都医科大学神经病学团队）**  
急性缺血性脑卒中患者的DWI（弥散加权成像）中，核心梗死区域的精确分割对治疗决策至关重要。传统U-Net等CNN模型受限于感受野不足，难以完整捕捉大面积或形态复杂病灶的全局空间结构。基于Swin Transformer的分割框架（如Swin-Unet）利用其**分层特征金字塔**与**移动窗口自注意力**，可同时提取局部边缘细节和全局病灶轮廓。首都医科大学团队在临床数据上验证，该方法对基底节、皮层等不同部位病灶的Dice系数较U-Net提升约5%~8%，且对微小病灶（如直径<1cm的腔隙性梗死）的检出灵敏度显著增高，为溶栓窗内快速量化梗死体积提供了高效、稳健的AI辅助工具。