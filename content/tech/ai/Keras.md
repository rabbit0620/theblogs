# Keras

Parent: [[ai_keywords]]

# Keras

## 核心定义
Keras 是一个高级深度学习 API，最初由 François Chollet 开发，现作为 TensorFlow 的官方前端。它以极简、模块化和用户友好为设计哲学，允许开发者通过轻量级 Python 代码快速搭建、训练和部署神经网络模型，特别适合原型验证和跨学科研究。

## 关键技术点
1. **极低入门门槛**  
   - 提供高度抽象化的接口，如 `Sequential` 和 `Functional API`，用户无需深入底层图计算即可定义层结构（如全连接、卷积、循环层），大幅缩短从理论到代码的转化时间。

2. **模块化与可组合性**  
   - 将网络视为独立层（Layer）、损失函数（Loss）、优化器（Optimizer）和指标（Metrics）的“乐高积木”。预置模块如 `Conv2D`、`LSTM`、`BatchNormalization` 可快速组合，并支持自定义损失和回调（如早停、学习率调度）。

3. **多后端可移植性**  
   - 早期支持 TensorFlow、Theano、CNTK 后端，当前默认绑定 TensorFlow 2.x。用户可在 CPU/GPU/TPU 间无缝切换，且同一代码可部署至移动端（TensorFlow Lite）或云端（TF Serving）。

4. **原生混合精度与分布式训练**  
   - 内建 `mixed_float16` 策略，支持自动混合精度训练，减少显存占用。同时通过 `tf.distribute.MirroredStrategy` 实现多 GPU 数据并行，加速大模型（如3D医学影像模型）训练。

## 医学/神经科学应用场景
**基于静息态功能磁共振成像（rs-fMRI）的阿尔茨海默病早期分类**  
在首都医科大学宣武医院神经病学研究中，团队利用 Keras 的 `Functional API` 构建了一个双流卷积网络：  
- 输入：预处理后的 rs-fMRI 时间序列（维度 96×96×T）及脑功能连接矩阵（灰度共生图像）。  
- 模型结构：一条流使用 `Conv3D` 提取时空特征；另一条流使用 `Conv2D` 分析连接矩阵；两流经全局平均池化后拼接，通过 `Dense(256)→Dropout(0.5)→Dense(2, softmax)` 输出认知正常/轻度认知障碍（MCI）二分类。  
- 关键技术：利用 Keras 的 `learning_rate_scheduler` 动态调优，并结合 `EarlyStopping` 防止过拟合。在 1200 例受试者数据上达到 89.7% 的 AUC，且模型可解释性（Grad-CAM 热图）验证了海马体、后扣带回等 AD 关键脑区的激活模式。  
该方案已被写入临床辅助诊断工具原型，推动神经退行性疾病的无创筛查。