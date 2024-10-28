# アプリケーション名

Wishy

# アプリケーション概要

wish リストの作成を補助し具体的なアクションプランの提示まで行うことで、空き時間を有意義な時間に変えることができる。

### wish リストの作成補助

- 全ユーザー共有の wish リストを閲覧し、イイねを付けるだけで自分の wish リストを作成できる
- イイねを何回でも押すことができ、wish リスト内の希望度の重み付けが出来る
- AI を用いて、リスト内容と重み、ユーザーからのリクエスト内容を考慮した新しい wish 候補を提案する。

### アクションプランの提示

- AI を用いて、リスト内容と重み、ユーザーからのリクエスト内容を考慮した具体的なアクションプランを提案する。

# URL

https://wishy-client.vercel.app/

# アプリケーションを作成した背景

私自身新しいことへの挑戦が好きです。しかし働き始めると情報収集や具体的なアクションプランを立てる時間を確保することが難しくなり、何もしないまま終える休日ができるようになりました。これを解決する為に、できるだけ労力と時間をかけずに wish リストの作成ができ、アクションプラン作成まで出来る本アプリケーションを開発するに至りました。

# テーブル設計

## users テーブル

| Column             | Type   | Options                  |
| :----------------- | :----- | :----------------------- |
| email              | string | null:false, unique: true |
| encrypted_password | string | null:false               |

### Association

- has_many :likes

## wishes テーブル

| Column  | Type   | Options    |
| :------ | :----- | :--------- |
| title   | string | null:false |
| content | string |            |

### Association

- has_many :likes

## likes テーブル

| Column | Type       | Options                       |
| :----- | :--------- | :---------------------------- |
| count  | integer    | null:false                    |
| wish   | references | null:false, foreign_key: true |
| user   | references | null:false, foreign_key: true |

### Association

- belongs_to :user
- belongs_to :wish

## chats テーブル

| Column  | Type       | Options                       |
| :------ | :--------- | :---------------------------- |
| title   | integer    | null:false                    |
| count   | integer    | null:false                    |
| request | integer    |                               |
| user    | references | null:false, foreign_key: true |

### Association

- belongs_to :user
