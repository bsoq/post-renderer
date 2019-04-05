import formatFileSize from './formatFileSize.js';

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

export default normalisePostData;
