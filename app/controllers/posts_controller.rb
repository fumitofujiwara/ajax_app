class PostsController < ApplicationController
  def index #indexアクションを定義した
    @posts = Post.all.order(id: "DESC") #全てのレコードを@postsに代入
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end
