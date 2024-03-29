export default class Factory {
    static mount(componentRef, data = undefined) {
        const component = new componentRef()
        let anchor = data?.anchor
        data || (data = {})
        anchor && !(data instanceof String) || (data.anchor = component.constructor.name)
        component.mount(data)
        return component;
    }
}
