import normalisePostData from './normalisePostData.js';
import templates from './templates.js';

function applyTemplate(base, key, insertion) {
    return base.replace(new RegExp(`{{${key}}}`, 'g'), insertion);
}

function renderPostAsHtml(post) {
    const postData = normalisePostData(post);
    let postHtml = templates.post;
    postHtml = applyTemplate(postHtml, key, post.name ? templates.name : '');
    postHtml = applyTemplate(postHtml, key, post.trip ? templates.trip : '');
    postHtml = applyTemplate(postHtml, key, post.file ? templates.file : '');
    for (const key of Object.keys(postData)) {
        postHtml = applyTemplate(postHtml, key, postData[key]);
    }
    return postHtml;
}

export default renderPostAsHtml;
