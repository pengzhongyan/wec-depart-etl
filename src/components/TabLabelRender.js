export default {
    name: "TabLabelFun",
    functional: true,
    props: {
        render: Function,
        label: String,
        content: String
    },
    render: (h, ctx) => {
        //传参数
        const label = ctx.props.label;
        const content = ctx.props.content;
        return <Button>{ctx.props.render(label, content)}</Button>;
    }
};
