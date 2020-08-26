# 项目简介
本项目利用区块链天然的去中心化和防篡改的优势，借鉴现有聊天工具的设计思路，在界面和用户体验上，融合部分微创新元素以符合用户的定制化聊天需求。

本项目主要研究基于区块链技术的去中心化聊天工具，该平台具备高可用、稳定性高、可扩展性强等优点，通过客户端（Android, iOS, Web），用户可以发送文字、语音、图片、红包、表情消息、阅后即焚，另外，作为区别于传统中心化聊天工具的特色功能：用户可以将好友信息记录到区块链上，实现去中心化好友体系，也可以自主保存聊天记录。 对注册登录的用户进行公钥、私钥、助记词的创建、绑定、密码设置和上传，主要用于加密、解密用户聊天记录、用户名、群名等隐私信息。

助记词用于保护私钥隐私安全，密聊密码用于保护助记词安全，用户只需设置密聊密码并自行保管，程序自动创建公私钥，加密生成助记词，再次用密聊密码加密助记词上传服务端； 用户可通过输入密聊密码在其他设备登录账号时，解密旧设备的聊天记录、用户名、群名等隐私信息，防止加密消息丢失；若用户丢失密聊密码，则无法解密隐私信息，但也可设置新的密聊密码创建新的助记词从而创建新的私钥，开始新的加密聊天。

用户间传输消息时，采用非对称加密公私钥，仅参与者可加密解密消息，服务端获取用户的公钥，无法解密查看加密消息内容，只负责传输加密消息文件，客户端通过用户的私钥对加密文件进行解密。 用户可私聊或群聊中使用隐私聊天模式，即阅后即焚模式，发送的消息会在对方查看过后一定时间内自动删除，双方均不留痕迹，保障私密聊天的隐私性。

主要技术运用：

采用分布式认证技术，通过分布式部署实现一套高并发、高可用的用户登陆认证服务。
采用资源池技术，保证高并发请求的同时，节省服务器资源。
采用“手机号+验证码”技术，终端在登陆时上报验证码，服务端在认证过程中对此验证码进行合法性校验，保障用户账户的安全性。
采用心跳机制，保证客户端和服务端连接的实时在线状态。
采用消息确认机制，保证客户端不丢消息。
采用非对称消息加密技术，保证消息只有参与方可见，即使服务端也无法破解，实现隐私聊天。

### 启动方案
安装依赖 npm run start
本地测试环境运行 npm run serve
生成环境打包 npm run build

#### License
BSD 3-Clause License

Copyright (c) 2020, 33.cn
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.