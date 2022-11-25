Rails.application.routes.draw do
  # get 'groups', to: "api/v1/group#index"
  namespace :api do
    namespace :v1 do
      
      # サンプル画面
      get 'sample/index', to: "sample#index"
      post 'sample/create'
    end
  end 

  namespace :api do
    namespace :v1 do
      
      # サンプル画面
      get 'group/index', to: "group#index"
      post 'group/create' => "group#create"
      put 'group/destroy/:id' => "group#destroy"
      put 'group/update/:id' => "group#update"

      get 'group/get/:group_name' => "group#get"
    
    end
  end 

  devise_for :users
  namespace :api do
    namespace :v1 do
      get 'user/index'
      post 'user/create' => "user#create"
      put 'user/destroy/:id', to: 'user#destroy'
      put 'user/update/:id', to: 'user#update'
    end
  end

  get 'home/index'
  root 'home#index'
  get 'home/notAuthorized', to: "home#notAuthorized"
  get '/users', to: "api/v1/user#defaultIndex"
  get '/groups', to: "api/v1/group#defaultIndex"
  get '/samples', to: "api/v1/sample#defaultIndex"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
