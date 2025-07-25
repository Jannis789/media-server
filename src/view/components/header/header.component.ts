import AlpineTemplate from "../../../controller/utils/AlpineTemplateDecoratorFactory";
import "./header.scss";
import "/global.scss";

@AlpineTemplate("x-header", "/header/header.html")
class XHeader {}

export { XHeader };