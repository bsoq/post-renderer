import templates from './templates.js';

function renderThreadAsHtml(thread, css) {
    return templates.thread({
        css,
        title: thread[0].subject,
        threadId: thread[0].number,
        op: templates.op(thread[0]),
        replies: thread.slice(1).map(templates.post).join('')
    });
}

export default renderThreadAsHtml;
