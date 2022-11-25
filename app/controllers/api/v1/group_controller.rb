class Api::V1::GroupController < ApplicationController
  before_action :set_group, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token
    def index
      begin
        @groups = Group.where('del_flg= ?',0).order('id ASC')
        if @groups.length==0
          #グループデータがないと、メッセージを表示する。
          render json: {
            error: "No Data",message:"M075",errSatus:"1"
          }, status: :ok
        else
          render json: {groups:@groups, errStatus:"0"} 
        end
      rescue => e
        #グループデータ取得に失敗の場合。
        render json: {
          message:"M060",errStatus:"1",editable:0
        }, status: :ok
      end
    end

     # 新規作成処理
    def new
      @group = Group.new
    end

    #データベスにグループデータを登録する。
    def create
      begin
        #グループ名が存在するかどうか、ちゃっくする。
        @groupsName = Group.where('group_name= ?',params[:group_name])
        if @groupsName.length==0
          @groups = Group.new(group_params)
          @groups.created_user = 1
          @groups.updated_user = 1
          @groups.del_flg = 0
          @groups.save
          render json:{groups: @groups,errStatus:"0"}
        else
          #グループ名が存在すると、メッセージを表示する。
          render json: {
            message:"M009",errStatus:"1"
          }, status: :ok
        end       
      rescue => e
         #例外エラーすると、メッセージを表示する。
        render json: {
          message:"M056",errStatus:"0"
        }, status: :ok
      end
    end

  #グループデータ削除する。
    def destroy
      begin
        @groups = Group.find(params[:id]) 
        @groups.del_flg=1
        @groups.updated_user = 3
        @groups.update(group_params) 
        render json:  {groups:@groups, errStatus:"0"}
      rescue ActiveRecord::RecordNotFound => e  
        #グループid が存在しないと、メッセージを表示する。
        render json: {
          error: "No Data",message:"M074",errStatus:"1"
        }, status: :ok   
      rescue ActiveRecord::StatementInvalid => e
         #SQL構文がまちがうと、メッセージを表示する。
        render json: {
          error: "No Data",message:"M059",errStatus:"1"
        }, status: :ok   
      rescue => e
         #例外エラーすると、メッセージを表示する。
        render json: {
          error: "DB Error",message:"M059",errStatus:"1"
        }, status: :ok   
      end      
    end

    #データベースにグループデータを更新する。
    def update
      begin
        #グループ名が存在するかどうか、チャックする。
        @groupsName = Group.where('group_name= ? and  id!=?',params[:group_name],params[:id])
        if @groupsName.length==0
          #グループ名が既にテーブル「group」にない場合テーブルに更新する
          @groups = Group.find(params[:id])      
          @del_flg=@groups.del_flg
          if(@del_flg==0)
            @groups.updated_user = 2
            @groups.update(group_params)
            render json:  {groups:@groups,editable:1}
          else
            render json:{editable:0,message:"グループ名が存在しません。"}
          end
        else
          #グループ名が既にテーブル「group」に存在する場合、メッセージを表示する。
          render json: {
            message:"M009",errStatus:"0",editable:0
          }, status: :ok
        end
        
      rescue => e
         #例外エラーすると、メッセージを表示する。
         render json: {
          message:"M058",errStatus:"0",editable:0
        }, status: :ok
      end
       
    end

    private
    # グループデータ設定処理
    def set_group
      @group = Group.find(params[:id])
    end

     # グループ引数
     def group_params
      params.require(:group).permit(:group_name, :group_description)
    end
  end