import Component from "../../../component";
import template from './video-part.html'

export default class VideoPart extends Component {
    mount({ anchor, date, description, src }) {
        super.mount({
            anchor, template
        })

        this.find('#videoDate').innerHTML = date
        this.find('#videoDescription').innerHTML = description
        this.find('#videoContainer iframe').src = src
    }
}