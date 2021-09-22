# broken link checker parser

Teeny-tiny helper to parse the output of the [broken-link-checker](https://github.com/stevenvachon/broken-link-checker) command line tool into a simple list of pages and which links are actually broken.


## Usage

```
node index.js --output output.csv --ignore HTTP_308 --src example.txt
```

Using the `--ignore` option allows you to skip certain broken links.

## Examples

This input from [example.txt](example.txt):
```
Getting links from: https://facy.jp/
├───OK─── https://twitter.com/FACY_official
├───OK─── https://styler.link/company/
├───OK─── https://open.spotify.com/show/6VOYDuA5eeZF4gwYYkNzPK?si=LCrfC0KNR8-xRh2oJjOAdg
├───OK─── https://facy.jp/article/men
├───OK─── https://facy.onelink.me/OkRr?pid=Media&af_web_dp=https%3A%2F%2Ffacy.jp%2F&c=media_top
├───OK─── https://facy.jp/article/women
├─BROKEN─ https://facy.jp/shops/ (HTTP_308)
├───OK─── https://facy.jp/advertising
├───OK─── https://www.facebook.com/facyjp/
├───OK─── https://www.instagram.com/facy_men/
├───OK─── https://facy.jp/application
└───OK─── https://facy.jp/privacy-policy
Finished! 84 links found. 72 excluded. 1 broken.

Getting links from: https://facy.jp/article/men/news/post-59119
├─BROKEN─ https://facy.jp/shops/ (HTTP_308)
├─BROKEN─ https://facy.jp/posts/16545/replies/51995 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16545/replies/51995 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16545/replies/51995 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16545/replies/51995 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16089/replies/50159 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16089/replies/50159 (HTTP_404)
├─BROKEN─ https://facy.jp/posts/16089/replies/50159 (HTTP_404)
```

Would generate:
```csv
URL,LINK,STATUS
https://facy.jp/article/men/news/post-59119,https://facy.jp/posts/16545/replies/51995,HTTP_404
https://facy.jp/article/men/news/post-59119,https://facy.jp/posts/16089/replies/50159,HTTP_404

```