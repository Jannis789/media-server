import AlpineTemplate from "../../../controller/utils/AlpineTemplateDecoratorFactory";

@AlpineTemplate("x-header", "/header/header.html")
class XHeader {
    public title: string = "Media Server";
}

export { XHeader };