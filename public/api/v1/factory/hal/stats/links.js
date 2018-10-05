module.exports = async ({ origin, userName, quizId, offset, limit, total, tag, dateFrom, dateTo }) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}/stats`;

    let urlObj = new URL(url);

    urlObj.searchParams.set('offset', 0);
    urlObj.searchParams.set('limit', limit);
    let urlFirst = urlObj.toString();

    urlObj.searchParams.set('offset', parseInt(total / Math.max(limit, 1)) * limit);
    urlObj.searchParams.set('limit', limit);
    let urlLast = urlObj.toString();

    urlObj.searchParams.set('offset', offset);
    urlObj.searchParams.set('limit', limit);

    if (tag) {
        if (!Array.isArray(tag)) tag = [ tag ];

        for (let tagItem of tag)
            urlObj.searchParams.append('tag', tagItem);
    }

    if (dateFrom)
        urlObj.searchParams.set('dateFrom', dateFrom);

    if (dateTo)
        urlObj.searchParams.set('dateTo', dateTo);

    let urlSelf = urlObj.toString();

    let _links = {
        first: {
            href: urlFirst, 
        },
        last: {
            href: urlLast,
        },
        self: {
            href: urlSelf,
        },
    };

    if (offset - limit > 0) {

        urlObj.searchParams.set('offset', offset - limit);
        urlObj.searchParams.set('limit', limit);
        _links = {
            ..._links,
            prev: {
                href: urlObj.toString(),
            },
        };
    }

    if (offset + limit < total) {

        urlObj.searchParams.set('offset', offset + limit);
        urlObj.searchParams.set('limit', limit);
        _links = {
            ..._links,
            next: {
                href: urlObj.toString(),
            },
        };
    }

    return _links;

}
