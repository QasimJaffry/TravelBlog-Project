const path = require(`path`);


const makeRequest = (graphql, request) => new Promise ((resolve, reject) => {
    resolve (
        graphql(request).then(result => {
            if(result.errors){
                reject(result.errors)
            }
            return result;
        })
    )
});


exports.createPages= ({ actions, graphql }) => {
    const { createPage } = actions;

    const getBlog = makeRequest(graphql, `
    {
        allContentfulBlog (
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}
            },)
        {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
    `).then(result => {
        result.data.allContentfulBlog.edges.forEach(({node}) => {
            createPage({
                path: `blog/${node.slug}`,
                component: path.resolve(`src/template/blog.js`),
                context: {
                    id: node.id
                },
            })
        })
    });
            //archive page
    const getArchive = makeRequest(graphql, `
    {
        allContentfulBlog (
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}
            },)
        {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
    `).then(result => {
        const blogs = result.data.allContentfulBlog.edges;
        const blogsPerPage = 9;
        const numPages = Math.ceil(blogs.length / blogsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                component: path.resolve("./src/template/archive.js"),
                context: {
                    limit: blogsPerPage,
                    skip: i * blogsPerPage,
                    numPages,
                    currentPage: i + 1
                },
            })
        })
    });
    //create travel page
    const getTravel = makeRequest(graphql, `
    {
        allContentfulBlog (
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}
                categoryRef: {elemMatch: {title: {eq: "Travel"}}}

            },)
        {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
    `).then(result => {
        const blogs = result.data.allContentfulBlog.edges;
        const blogsPerPage = 9;
        const numPages = Math.ceil(blogs.length / blogsPerPage)

        Array.from({ length: numPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/category/travel` : `/category/travel/${i + 1}`,
                component: path.resolve("./src/template/travel.js"),
                context: {
                    limit: blogsPerPage,
                    skip: i * blogsPerPage,
                    numPages,
                    currentPage: i + 1
                },
            })
        })
    });
//create guide page
const getGuide = makeRequest(graphql, `
{
    allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: {
            node_locale: {eq: "en-US"}
            categoryRef: {elemMatch: {title: {eq: "Guide"}}}

        },)
    {
        edges {
            node {
                id
                slug
            }
        }
    }
}
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges;
    const blogsPerPage = 9;
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/guide` : `/category/guide/${i + 1}`,
            component: path.resolve("./src/template/guide.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});
//create guide page
const getTech = makeRequest(graphql, `
{
    allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: {
            node_locale: {eq: "en-US"}
            categoryRef: {elemMatch: {title: {eq: "Tech"}}}

        },)
    {
        edges {
            node {
                id
                slug
            }
        }
    }
}
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges;
    const blogsPerPage = 9;
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/tech` : `/category/tech/${i + 1}`,
            component: path.resolve("./src/template/tech.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});
//create guide page
const getOpinion = makeRequest(graphql, `
{
    allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: {
            node_locale: {eq: "en-US"}
            categoryRef: {elemMatch: {title: {eq: "Opinion"}}}

        },)
    {
        edges {
            node {
                id
                slug
            }
        }
    }
}
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges;
    const blogsPerPage = 9;
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/opinion` : `/category/opinion/${i + 1}`,
            component: path.resolve("./src/template/opinion.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});
    return Promise.all([
        getBlog,
        getArchive,
        getTravel,
        getGuide,
        getTech,
        getOpinion
    ])
};