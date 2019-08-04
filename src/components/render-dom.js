// 函数式组件，没有生命周期，只传递数据，不做任何渲染
export default {
  functional: true, // 没有状态，没有实例的组件，只接收参数
  props: {
    // name: String,
    number: Number,
    renderFunc: Function
  },
  render: (h, ctx) => {
    // console.log(ctx.props.name)
    // return ctx.props.renderFunc(h, ctx.props.name);
    return ctx.props.renderFunc(h, ctx.props.number);
  }
}
