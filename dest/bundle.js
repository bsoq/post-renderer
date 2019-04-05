'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function formatFileSize(fileSize) {
    return `${fileSize} B`;
}

function normalisePostData(post) {
    const normalisedPost = {};
    if (post.com) {
        // it's in 4chan format
        normalisedPost.number = post.no;
        normalisedPost.comment = post.com;
        normalisedPost.time = post.time * 1000;
        normalisedPost.time4chanFormatted = post.now;
        normalisedPost.id = post.id;
        normalisedPost.name = post.name;
        normalisedPost.trip = post.trip;
        if (post.filename) {
            normalisedPost.filename = `${post.filename}${post.ext}`;
            normalisedPost.fileType = post.ext.slice(1).toUpperCase();
            normalisedPost.fileSize = formatFileSize(post.fsize);
            normalisedPost.fileSrc = `http://suptg.thisisnotatrueending.com/qstarchive/${post.resto}/images/${post.tim}${post.ext}`;
            normalisedPost.fileThumbSrc = `http://suptg.thisisnotatrueending.com/qstarchive/${post.resto}/thumbs/${post.tim}s${post.ext}`;
            normalisedPost.md5 = post.md5;
            normalisedPost.w = post.w;
            normalisedPost.h = post.h;
            normalisedPost.tn_w = post.tn_w;
            normalisedPost.tn_h = post.tn_h;
        }
    } else {
        // it's foolz-fuuka format
        normalisedPost.comment = post.comment;
    }
    return normalisedPost;
}

var post = "<div id=\"p{{number}}\" class=\"post reply\">\r\n    <div class=\"postInfoM mobile\" id=\"pim{{number}}\">\r\n        <span class=\"nameBlock\">\r\n            {{template-name}}\r\n            {{template-trip}}\r\n            <span class=\"posteruid id_{{id}}\">\r\n                (ID: <span class=\"hand\" title=\"Highlight posts by this ID\">{{id}}</span>)\r\n            </span>\r\n            <br>\r\n        </span>\r\n        <span class=\"dateTime postNum\" data-utc=\"{{time}}\">{{time4chanFormatted}}\r\n            <a href=\"#p{{number}}\" title=\"Link to this post\">No.</a>\r\n            <a href=\"javascript:quote('{{number}}');\" title=\"Reply to this post\">{{number}}</a>\r\n        </span>\r\n    </div>\r\n    <div class=\"postInfo desktop\" id=\"pi{{number}}\">\r\n        <input type=\"checkbox\" name=\"{{number}}\" value=\"delete\">\r\n        <span class=\"nameBlock\">\r\n            {{template-name}}\r\n            {{template-trip}}\r\n            <span class=\"posteruid id_{{id}}\">\r\n                (ID: <span class=\"hand\" title=\"Highlight posts by this ID\">{{id}}</span>)\r\n            </span>\r\n        </span>\r\n        <span class=\"dateTime\" data-utc=\"{{time}}\">{{time4chanFormatted}}</span>\r\n        <span class=\"postNum desktop\">\r\n            <a href=\"#p{{number}}\" title=\"Link to this post\">No.</a>\r\n            <a href=\"javascript:quote('{{number}}');\" title=\"Reply to this post\">{{number}}</a>\r\n        </span>\r\n    </div>\r\n    {{template-file}}\r\n    <blockquote class=\"postMessage\" id=\"m{{number}}\">{{comment}}</blockquote>\r\n</div>";

var name = "<span class=\"name\">{{name}}</span>";

var trip = "<span class=\"postertrip\">{{trip}}</span>";

var file = "<div class=\"file\" id=\"f{{number}}\">\r\n    <div class=\"fileText\" id=\"fT{{number}}\">\r\n        File: <a href=\"{{fileSrc}}\" target=\"_blank\">{{filename}}</a>\r\n        ({{fileSize}}, {{w}}x{{h}})\r\n    </div>\r\n    <a class=\"fileThumb\" href=\"{{fileSrc}}\" target=\"_blank\">\r\n        <img src=\"{{fileThumbSrc}}\" alt=\"{{fileSize}}\" data-md5=\"{{md5}}\" style=\"height: {{tn_w}}px; width: {{tn_h}}px;\">\r\n        <div data-tip=\"\" data-tip-cb=\"mShowFull\" class=\"mFileInfo mobile\">{{fileSize}} {{fileType}}</div>\r\n    </a>\r\n</div>";

var templates = {
    post,
    name,
    trip,
    file
};

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

exports.renderPostAsHtml = renderPostAsHtml;
