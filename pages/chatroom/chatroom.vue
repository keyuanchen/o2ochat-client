<template>
	<view>
		<view class="status-bar">
			<navigator open-type="navigateBack" class="login-c" hover-class="none">
				<image src="../../static/back.png" class="login-back"></image> 
			</navigator>
			<scroll-view scroll-x="true" class="scrollv">
				<view class="users">
					<view v-for="(e,index) in users" class="user-l" @click="showModify(index)">
						<view class="tip" v-if="e.tip"></view>
						<image :src="'../../static/images/'+e.img+'.png'"></image>
					</view>

				</view>
			</scroll-view>
		</view>
		<view class="main">
			<view v-for="(e,index) in chat" :key="index">
				<view class="left msg" v-if="e.id ==1">
					<image :src="'../../static/images/'+e.img+'.png'"></image>
					<view class="nr">
						<view class="neir">
							{{e.neir}}
						</view>
						<view class="nt">{{e.name}} {{timeDetia(e.time)}}</view>
					</view>
				</view>
				<view class="right msg" v-if="e.id==2">
					<image :src="'../../static/images/'+e.img+'.png'"></image>
					<view class="nr">
						<view class="neir">
							{{e.neir}}
						</view>
						<view class="nt">{{timeDetia(e.time)}}</view>
					</view>					
				</view>
				<view class="center" v-if="e.id==3">
					<view class="inner">{{e.name}}</view>				
				</view>
			</view>	
		</view>
		<view class="send">
			<textarea type="text" confirm-type="send" class="chat-send"  v-model="chatContent" auto-height="true" show-confirm-bar="false" maxlength="-1" />
			<image src="../../static/send.png" @click="sendMsg"  mode="aspectFit"></image>
		</view>
		<view class="modify" :animation="animationData">
			<view class="u-name">
				{{uname}}
			</view>
			<scroll-view class="modfiy-mian" scroll-y="true">
					<view v-for="(e,index) in o2ochat" :key="index">
						<view class="left msg" v-if="e.fid === fid">
							<image :src="'../../static/images/'+e.img+'.png'"></image>
							<view class="nr">
								<view class="neir">
									{{e.neir}}
								</view>
								<view class="nt">{{e.name}} {{timeDetia(e.time)}}</view>
							</view>
						</view>
						<view class="right msg" v-if="e.fid === uid && e.tid === fid">
							<image :src="'../../static/images/'+e.img+'.png'"></image>
							<view class="nr">
								<view class="neir">
									{{e.neir}}
								</view>
								<view class="nt">{{timeDetia(e.time)}}</view>
							</view>					
						</view>
					</view>	
			</scroll-view>
		</view>
		<view class="bg" @click="modify" :style="{display:bg}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatContent:'',			//消息内容
				name:'',			//用户名称
				uname:'',			//一对一弹层标题
				fid:'',				// 朋友id
				uid:'',
				img:'',				//用户头像
				chat: [],			//聊天内容
				animationData: {},
				bb:false,
				bg:'none',
				o2ochat: [			// 一对一消息数组
					// {
					// 	name: 'lisi',
					// 	img: 'a',
					// 	time: new Date(),
					// 	fid: 'a',
					// 	tid: 'c',
					// 	neir: 'hhhhhhhhhhh3434hhh'
					// }
				],
				users:[
				],
				users1:[
					{
						name:'小明',
						img:'a',
						tip:true,
						id:'a',
					},
					{
						name:'小花',
						img:'b',
						tip:false,
						id:'b',
					},
					{
						name:'小天',
						img:'c',
						tip:false,
						id:'c',
					},
					{
						name:'小花',
						img:'b',
						tip:true,
						id:'b',
					},
					{
						name:'小天',
						img:'c',
						tip:false,
						id:'c',
					},
					{
						name:'小花',
						img:'b',
						tip:false,
						id:'b',
					},
					{
						name:'小天',
						img:'c',
						tip:false,
						id:'c',
					},
					{
						name:'小花',
						img:'b',
						tip:false,
						id:'b',
					},
					{
						name:'小天',
						img:'c',
						tip:false,
						id:'c',
					}
				]
			}
		},
		onLoad: function (options) {
			this.name = options.name
			this.img = options.img
			this.join(this.name, this.img)
			this.welcomeTip()
			this.receiveMsg()
			this.quitGroup()
			this.receMsg()
			this.receiveO2oMsg()
		},
		methods: {
			// 显示一对一弹层
			showModify (index) {
				this.chatContent = ''
				this.uname = this.users[index].name
				this.fid = this.users[index].id
				// console.log(this.fid)
				if(this.users[index].tip) {
					this.users[index].tip = false
				}
				this.modify()
			},
			// 点击成员头像
			modify: function(){
				this.bb= !this.bb;
				if(this.bb){
					this.bg = 'block';
				}else{
					this.bg = 'none';
					// fid置空
					this.fid = ''
				}
				var animation = uni.createAnimation({
				   duration: 400,
				   timingFunction: 'ease',
				})
				this.chatContent = ''
				 this.animation = animation
				 if(this.bb){
				 	animation.bottom(0).step()
				 				 				  
				 }else{
				 	animation.bottom().step()		  
				 }				
				 this.animationData = animation.export()
			},
			timeDetia: function(date){
				var time;
				var d = new Date(date);
				var n = new Date();
				//获取时间戳
				var dd = d.getTime();
				var h = d.getHours();
				var m = d.getMinutes();
				var Y = d.getFullYear();
				var M = d.getMonth() + 1;
				var D = d.getDate();
				//现在时间
				var nn = n.getTime();
				var hh = n.getHours();
				var mm = n.getMinutes();
				var YY = n.getFullYear();
				var MM = n.getMonth() + 1;
				var DD = n.getDate();
				
				if( D == DD && M == MM && Y ==YY){
					if(h<10){
					h = '0'+h;
					}
					if(m<10){
						m = '0'+m;
					}
					time = h+':'+m;
					return time;
				}else if(D+1 == DD && M == MM && Y ==YY){
					if(h<10){
					h = '0'+h;
					}
					if(m<10){
						m = '0'+m;
					}
					time = '昨天'+' '+h+':'+m;
					return time;
				}else{
					if(M<10){
						M = '0'+M;
					}
					if(D<10){
						D = '0'+D;
					}
					if(h<10){
					h = '0'+h;
					}
					if(m<10){
						m = '0'+m;
					}
					time = Y+'年'+M+'月'+D+'日'+' '+h+':'+m;
					return time;
				}
			},
			//加入群
			join: function(name, img){
				// 向后端发消息
				this.socket.emit('join', name, img)
			},
			welcomeTip () {
				this.socket.on('welcome', (name, users) => {
					const data = {
						id: 3,
						name: `欢迎 ${name} 加入群聊`
					}
					this.chat.push(data)
					// 过滤掉是当前登录用户的那个信息
					for(let i=0; i<users.length; i++) {
						if(users[i].id === this.uid) {
							users.splice(i, 1)
						}
					}
					// console.log(users)
					this.users = users
				})
			},
			// 通知自己
			receMsg () {
				this.socket.on('self', (name, users, id) => {
					this.uid = id
					const data = {
						id: 3,
						name: `欢迎 ${name} 加入群聊`
					}
					// 过滤掉是当前登录用户的那个信息
					for(let i=0; i<users.length; i++) {
						if(users[i].id === this.uid) {
							users.splice(i, 1)
						}
					}
					// console.log(users)
					this.users = users
					this.chat.push(data)
				})
			},
			sendMsg () {
				// 如果有输入再 发送
				if (this.chatContent.trim() && !this.fid ) {
					const data = {
						id: 2,
						neir: this.chatContent,
						name: this.name,
						time: new Date(),
						img: this.img
					}
					const data1 = {
						id: 1,
						neir: this.chatContent,
						name: this.name,
						time: new Date(),
						img: this.img
					}
					this.chat.push(data)
					// 传给后端让后端进行广播
					this.socket.emit('sendMsg', data1)
					// 清空输入康
					this.chatContent = ''
				} else if (this.chatContent.trim() && this.fid !== '') {
					const data = {
						neir: this.chatContent,
						name: this.name,
						time: new Date(),
						img: this.img,
						fid: this.uid,
						tid: this.fid
					}
					const data1 = {
						neir: this.chatContent,
						name: this.name,
						time: new Date(),
						img: this.img,
						fid: this.uid,
						tid: this.fid
					}
					this.o2ochat.push(data)
					// console.log(123)
					// 传给后端让后端进行广播
					this.socket.emit('o2oSendMsg', data1)
					// 清空输入康
					this.chatContent = ''
				}
			},
			// 一对一聊天接收消息
			receiveO2oMsg () {
				this.socket.on('sendO2oMsg', data => {
					// 修改users中当前id项的tip为true
					// data.fid === this.fid 说明是当前打开的一对一对话框
					if(data.fid !== this.fid) {
						// 遍历找出一对一发消息的那一方的信息，修改tip为true
						for (let i=0;i<this.users.length;i++) {
							if(this.users[i].id === data.fid) {
								this.users[i].tip = true
							}
						}
					}
					// console.log(data)
					this.o2ochat.push(data)
				})
			},
			// 接收后端发来的广播（新成员发的消息）
			receiveMsg () {
				this.socket.on('broadcastMsg', data => {
					this.chat.push(data)
				}) 
			},
			quitGroup () {
				this.socket.on('quit', (name, users) => {
					const data = {
						id: 3,
						name: `成员 ${name} 退出了群聊`
					}
					this.chat.push(data)
					this.users = users
				})
			}
		}
	}
</script>

<style lang="scss">
	.status-bar{
			position: fixed;
			left: 0;
			width: 100%;
			height: 88rpx;
			padding-top: var(--status-bar-height);
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			overflow: hidden;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
			z-index: 998;
			color: #272832;
			-webkit-transition-property: all;
			transition-property: all;
			background:rgba(255,255,255,0.96);
			.login-c{
				width: 60rpx;
				height: 60rpx;
				padding-top: 22rpx;
				padding-left: 32rpx;
			}
			.login-back{
				width: 20rpx;
				height: 34rpx;
			}
			.scrollv{
				width: 84%;
				.users{
					//background: #eee;
					display: flex;
					.user-l{
						padding: 12rpx 8rpx;
						position: relative;
						image{
							width:64rpx;
							height:64rpx;
							border-radius: 50%;
						}
						.tip{
							width:14rpx;
							height:14rpx;
							background:rgba(255,77,60,1);
							position: absolute;
							top: 12rpx;
							right: 10rpx;
							border-radius: 50%;
							z-index: 10;
						}
					}
					
				}
			}
		}
		.main{
			padding: 160rpx 28rpx 160rpx;
		}
		.main,.modfiy-mian{
		
			.msg{
				display: flex;
				
				align-items:flex-end;
				padding: 40rpx 0;
				image{
					flex: none;
					width:64rpx;
					height:64rpx;
					border-radius:18rpx;
					margin: 0 20rpx;
					
				}
				.nr{
					.neir{
						max-width:380rpx;
						padding:26rpx 32rpx;
						min-height:48rpx;
						font-size:28rpx;
						color:rgba(25,29,35,1);
						line-height:40rpx;
					}
					.nt{
						padding-top: 8rpx;
						position: absolute;
						font-size:24rpx;
						color:rgba(25,29,35,0.5);
						line-height:34rpx;
					}
				}
			}
			.left{
				flex-direction: row;
				.neir{
					background:rgba(244,244,244,1);
					border-radius:24rpx 24rpx 24rpx 0px;
				}
			}
			.right{
				flex-direction: row-reverse;
				.neir{
					background:rgba(255,234,222,1);
					border-radius:24rpx 24rpx 0px 24rpx;
				}
				.nt{
					right: 132rpx;
				}
			}
			.center{
				text-align: center;
				padding: 32rpx 0 20rpx;
				.inner{
					font-size:24rpx;
					display: inline-block;
					color:rgba(25,29,35,0.5);
					line-height:34rpx;
				}
			}
		}
		.send{
			position: fixed;
			z-index: 1002;
			bottom: 0;
			width: 100%;
			
			padding-bottom:var(--status-bar-height);
			min-height: 100rpx;
			background:rgba(255,255,255,0.96);
			display: flex;
			.chat-send{
				margin: 12rpx 48rpx;
				
				flex: 1;
				width: 100%;
				min-height:40rpx;
				background:rgba(242,242,242,1);
				border-radius:24rpx;
				font-size:28rpx;
				color:rgba(25,29,35,1);
				line-height:40rpx;
				padding: 24rpx 80rpx 24rpx 24rpx;
			}
			image{
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				right: 68rpx;
				top: 32rpx;
			}
		}
		.modify{
			position: fixed;
			overflow: hidden;
			left: 0;
			bottom:-90%;
			width: 100%;
			height: 90%;
			z-index: 1000;
			background: #fff;
			border-radius:48rpx 48rpx 0px 0px;
		}
		.u-name{
			position: absolute;
			top: 0;
			background-color: #fff;
			height: 80rpx;
			text-align: center;
			width: 100%;
			line-height: 80rpx;
		}
		.modfiy-mian{
			padding: 88rpx 28rpx 120rpx;
			box-sizing: border-box;
			height: 100%;
		}
		.bg{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: rgba(0,0,0,0.4);
		}
	</style>