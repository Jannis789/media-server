import { Component } from "#decorators/Component";
import landingPageStyles from './x-landing-page.xcss';
import landingPageTemplate from './x-landing-page.tmpl';

@Component('x-landing-page')
class XLandingPage {
    static styles = [landingPageStyles];
    
    static template = landingPageTemplate;

    imageURI = 'https://wallpaperaccess.com/download/movie-film-2063931';
}

export { XLandingPage };