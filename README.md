# study-GraphQL

[Building Better APIs with GraphQL](https://www.udemy.com/building-better-apis-with-graphql/)の復習用リポジトリです。

## 前提

### GraphiQL.appの利用

[GraphiQL.app](https://github.com/skevy/graphiql-app)をbrewでインストールする。

GraphiQL.appのHTTPメソッドはPOSTにする。Command + Rの再読込で更新する。

### クライアントのソースコードのパス変更

[react-scripts](https://www.npmjs.com/package/react-scripts)の設定はCreate React Appした直後は隠蔽されているので、`npm run eject`で設定ファイルを出力しconfig/paths.jsを変更する。

## 実行手順

### Queryのサンプル

#### サーバーの起動

`node src/server_query/index.js`を実行する

#### GraphiQL

GraphiQL.appを起動する

URLは下記

http://localhost:5000/graphql Method POST

クエリは下記

```
query find ($film: Int) {
 find_film(id: $film) {
   title
   producers
   characters(limit: 2) {
	 name
	 homeworld {
	   name
	 }
   }
 }
}
``` 

パラメーターは下記

```
{
	"film": 2
}
```

### Mutationのサンプル

#### サーバーの起動

`node src/server_mutation/index.js`を実行する

#### GraphiQL

GraphiQL.appを起動する

URLは下記

http://localhost:5000/graphql Method POST

クエリは下記

```
mutation create ($post: PostInput) {
  post: create_post(post: $post) {
    title
    slug
    date
    body
  }
}
``` 

パラメーターは下記

```
{
	"post": {
		"title": "test1",
		"date": "2016-12-29",
		"body": "# test"
	}
}
```

titleを変えながら何回か実行する。次にクエリを下記に変えて実行する。

```
query get {
  posts: all_posts {
  	title
  	date
    slug
    body
	}
}
``` 

