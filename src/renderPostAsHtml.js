import normalisePostData from './normalisePostData.js';
import templates from './templates.js';

function renderPostAsHtml(post) {
    const postData = normalisePostData(post);
    let postHtml = templates.post;
    for (const key of Object.keys(postData)) {
        postHtml = postHtml.replace(new RegExp(`{{${key}}}`, 'g'), postData[key]);
    }
    return postHtml;
}

export default renderPostAsHtml;
