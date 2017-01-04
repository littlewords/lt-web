<template>
	<ul>
		<li v-for="item in list">
			{{item}}
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			list: {
				default: false
			}
		}
	}
</script>

<style scoped>
	ul{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li{
		margin: 0;
		padding: 0;
		list-style:none;
		/*min-height: 40px;*/
		background: #fff;
		font-size: .28rem;
		padding: .2rem .3rem;
		position: relative;
	}
	li:after{
		content: '';
		display: block;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		border-bottom: 1px solid #ccc;
		transform: scale(1, 0.3);
	}
</style>