var converter = new showdown.Converter({
    openLinksInNewWindow: true,
    parseImgDimensions: true,
});

const regex = {
title: /^#\s+.+/,
heading: /^#+\s+.+/,
custom: /\$\$\s*\w+/,
ol: /\d+\.\s+.*/,
ul: /\*\s+.*/,
task: /\*\s+\[.]\s+.*/,
blockQuote: /\>.*/,
table: /\|.*/,
image: /\!\[.+\]\(.+\).*/,
url: /\[.+\]\(.+\).*/,
codeBlock: /\`{3}\w+.*/,
};

const isTitle = (str) => regex.title.test(str);
const isHeading = (str) => regex.heading.test(str);
const isCustom = (str) => regex.custom.test(str);
const isOl = (str) => regex.ol.test(str);
const isUl = (str) => regex.ul.test(str);
const isTask = (str) => regex.task.test(str);
const isBlockQuote = (str) => regex.blockQuote.test(str);
const isImage = (str) => regex.image.test(str);
const isUrl = (str) => regex.url.test(str);
const isCodeBlock = (str) => regex.codeBlock.test(str);

export async function getTitleAndContentFromMarkdown(info) {
    if (!info.contentIsMarkdown) {
        return info;
    }

    let data = await fetch(info.markdown)
        .then(response => response.text())

    info.title = getMdTitle(data);
    info.content = converter.makeHtml(data);
    info.contentIsHTML = true;
    return info;
}

export function getMdTitle(md) {
    if (!md) return "";

    let tokens = md.split("\n");

    for (let i = 0; i < tokens.length; i++) {
        if (isTitle(tokens[i])) {
            return tokens[i].split("#")[1];
        } 
    }
    return "";
}

export function getMdDescription(md) {
    if (!md) return "";
    let tokens = md.split("\n");
    for (let i = 0; i < tokens.length; i++) {
        if (
            isHeading(tokens[i]) ||
            isCustom(tokens[i]) ||
            isOl(tokens[i]) ||
            isUl(tokens[i]) ||
            isTask(tokens[i]) ||
            isBlockQuote(tokens[i]) ||
            isImage(tokens[i]) ||
            isUrl(tokens[i]) ||
            isCodeBlock(tokens[i])
        ) {
            continue;
        }

        return tokens[i];
    }
    return "";
}