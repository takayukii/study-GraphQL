const Schema = require('graph.ql');
const Remarkable = require('remarkable');
const remarkable = new Remarkable();
const to_slug = require('to-slug-case');
const assign = require('object-assign');

const posts = {};

module.exports = Schema(`
  scalar Date
  scalar Markdown
  
  type Post {
    title: String!
    date: Date!
    body: Markdown!
    slug: String!
  }
  
  input PostInput {
    title: String!
    date: Date!
    body: Markdown!
  }
  
  type Mutation {
    create_post (post: PostInput): Post
  }
  
  type Query {
    all_posts(): [Post]
  }
`, {
  Date: {
    serialize (v) {
      return new Date(v);
    },
    parse (v) {
      const date = new Date(v);
      return date.toISOString();
    }
  },
  Markdown: {
    serialize (v) {
      return v;
    },
    parse (v) {
      return remarkable.render(v);
    }
  },
  Mutation: {
    create_post (mutation, args) {
      const slug = to_slug(args.post.title);
      posts[slug] = assign(args.post, {
        slug: slug
      });
      return posts[slug];
    }
  },
  Query: {
    all_posts () {
      return Object.keys(posts).map((slug) => {
        return posts[slug];
      });
    }
  }
});
