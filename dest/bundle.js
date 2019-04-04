'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function formatFileSize(fileSize) {
    return `${fileSize} B`;
}

function normalisePostData(post) {
    const normalisedPost = {};
    if (post.com) {
        // it's in 4chan format
        normalisedPost.comment = post.com;
        normalisedPost.id = post.id;
        normalisedPost.trip = post.trip;
        normalisedPost.name = post.name;
        normalisedPost.filename = `${post.filename}${post.ext}`;
        normalisedPost.fileSrc = `http://suptg.thisisnotatrueending.com/qstarchive/${post.resto}/images/${post.tim}${post.ext}`;
        normalisedPost.fileThumbSrc = `http://suptg.thisisnotatrueending.com/qstarchive/${post.resto}/thumbs/${post.tim}s${post.ext}`;
        normalisedPost.md5 = post.md5;
        normalisedPost.w = post.w;
        normalisedPost.h = post.h;
        normalisedPost.tn_w = post.tn_w;
        normalisedPost.tn_h = post.tn_h;
        normalisedPost.fileType = post.ext.slice(1).toUpperCase();
        normalisedPost.fileSize = formatFileSize(post.fsize);
        normalisedPost.number = post.no;
        normalisedPost.time = post.tim;
        normalisedPost.time4chanFormatted = post.now;
    } else {
        // it's foolz-fuuka format
        normalisedPost.comment = post.comment;
    }
    return normalisedPost;
}

var post = "<div id=\"p{{number}}\" class=\"post reply\">\r\n    <div class=\"postInfoM mobile\" id=\"pim{{number}}\">\r\n        <span class=\"nameBlock\">\r\n            <span class=\"name\">{{name}}</span>\r\n            <span class=\"postertrip\">{{trip}}</span>\r\n            <span class=\"posteruid id_{{id}}\">\r\n                (ID: <span class=\"hand\" title=\"Highlight posts by this ID\">{{id}}</span>)\r\n            </span>\r\n            <br>\r\n        </span>\r\n        <span class=\"dateTime postNum\" data-utc=\"1482881424\">12/27/16(Tue)18:30:24\r\n            <a href=\"#p{{number}}\" title=\"Link to this post\">No.</a>\r\n            <a href=\"javascript:quote('{{number}}');\" title=\"Reply to this post\">{{number}}</a>\r\n        </span>\r\n    </div>\r\n    <div class=\"postInfo desktop\" id=\"pi{{number}}\">\r\n        <input type=\"checkbox\" name=\"{{number}}\" value=\"delete\">\r\n        <span class=\"nameBlock\">\r\n            <span class=\"name\">{{name}}</span>\r\n            <span class=\"postertrip\">{{trip}}</span>\r\n            <span class=\"posteruid id_{{id}}\">\r\n                (ID: <span class=\"hand\" title=\"Highlight posts by this ID\">{{id}}</span>)\r\n            </span>\r\n        </span>\r\n        <span class=\"dateTime\" data-utc=\"1482881424\">12/27/16(Tue)18:30:24</span>\r\n        <span class=\"postNum desktop\">\r\n            <a href=\"#p{{number}}\" title=\"Link to this post\">No.</a>\r\n            <a href=\"javascript:quote('{{number}}');\" title=\"Reply to this post\">{{number}}</a>\r\n        </span>\r\n    </div>\r\n    <div class=\"file\" id=\"f{{number}}\">\r\n        <div class=\"fileText\" id=\"fT{{number}}\">\r\n            File: <a href=\"{{fileSrc}}\" target=\"_blank\">{{filename}}</a>\r\n            ({{fileSize}}, {{w}}x{{h}})\r\n        </div>\r\n        <a class=\"fileThumb\" href=\"{{fileSrc}}\" target=\"_blank\">\r\n            <img src=\"{{fileThumbSrc}}\" alt=\"{{fileSize}}\" data-md5=\"{{md5}}\" style=\"height: {{tn_w}}px; width: {{tn_h}}px;\">\r\n            <div data-tip=\"\" data-tip-cb=\"mShowFull\" class=\"mFileInfo mobile\">{{fileSize}} {{fileType}}</div>\r\n        </a>\r\n    </div>\r\n    <blockquote class=\"postMessage\" id=\"m{{number}}\">{{comment}}</blockquote>\r\n</div>";

var templates = {
    post
};

function renderPostAsHtml(post) {
    const postData = normalisePostData(post);
    let postHtml = templates.post;
    for (const key of Object.keys(postData)) {
        postHtml = postHtml.replace(new RegExp(`{{${key}}}`, 'g'), postData[key]);
    }
    return postHtml;
}

exports.renderPostAsHtml = renderPostAsHtml;
