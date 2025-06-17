/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  email: Scalars['String']['output'];
  full_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type Float_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Float']['input']>;
  _gt?: InputMaybe<Scalars['Float']['input']>;
  _gte?: InputMaybe<Scalars['Float']['input']>;
  _in?: InputMaybe<Array<Scalars['Float']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Float']['input']>;
  _lte?: InputMaybe<Scalars['Float']['input']>;
  _neq?: InputMaybe<Scalars['Float']['input']>;
  _nin?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
  user: AuthUser;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** An array relationship */
  recipe_categories: Array<Recipe_Categories>;
  /** An aggregate relationship */
  recipe_categories_aggregate: Recipe_Categories_Aggregate;
};


/** columns and relationships of "categories" */
export type CategoriesRecipe_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


/** columns and relationships of "categories" */
export type CategoriesRecipe_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate';
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Categories_Bool_Exp>>;
  _not?: InputMaybe<Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Categories_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_categories?: InputMaybe<Recipe_Categories_Bool_Exp>;
  recipe_categories_aggregate?: InputMaybe<Recipe_Categories_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  CategoriesPkey = 'categories_pkey'
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipe_categories?: InputMaybe<Recipe_Categories_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};

/** on_conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns?: Array<Categories_Update_Column>;
  where?: InputMaybe<Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_categories_aggregate?: InputMaybe<Recipe_Categories_Aggregate_Order_By>;
};

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "categories" */
export type Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Categories_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Name = 'name'
}

export type Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Categories_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "ingredients" */
export type Ingredients = {
  __typename?: 'ingredients';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "ingredients" */
export type IngredientsRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** aggregated selection of "ingredients" */
export type Ingredients_Aggregate = {
  __typename?: 'ingredients_aggregate';
  aggregate?: Maybe<Ingredients_Aggregate_Fields>;
  nodes: Array<Ingredients>;
};

/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_Fields = {
  __typename?: 'ingredients_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Ingredients_Max_Fields>;
  min?: Maybe<Ingredients_Min_Fields>;
};


/** aggregate fields of "ingredients" */
export type Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "ingredients". All fields are combined with a logical 'AND'. */
export type Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Ingredients_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "ingredients" */
export enum Ingredients_Constraint {
  /** unique or primary key constraint on columns "id" */
  IngredientsPkey = 'ingredients_pkey'
}

/** input type for inserting data into table "ingredients" */
export type Ingredients_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Ingredients_Max_Fields = {
  __typename?: 'ingredients_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Ingredients_Min_Fields = {
  __typename?: 'ingredients_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "ingredients" */
export type Ingredients_Mutation_Response = {
  __typename?: 'ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Ingredients>;
};

/** input type for inserting object relation for remote table "ingredients" */
export type Ingredients_Obj_Rel_Insert_Input = {
  data: Ingredients_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};

/** on_conflict condition type for table "ingredients" */
export type Ingredients_On_Conflict = {
  constraint: Ingredients_Constraint;
  update_columns?: Array<Ingredients_Update_Column>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "ingredients". */
export type Ingredients_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
};

/** primary key columns input for table: ingredients */
export type Ingredients_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "ingredients" */
export enum Ingredients_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "ingredients" */
export type Ingredients_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "ingredients" */
export type Ingredients_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Ingredients_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Ingredients_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "ingredients" */
export enum Ingredients_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Ingredients_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Ingredients_Set_Input>;
  /** filter the rows which have to be updated */
  where: Ingredients_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "ingredients" */
  delete_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** delete single row from the table: "ingredients" */
  delete_ingredients_by_pk?: Maybe<Ingredients>;
  /** delete data from the table: "recipe_bookmarks" */
  delete_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** delete single row from the table: "recipe_bookmarks" */
  delete_recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** delete data from the table: "recipe_categories" */
  delete_recipe_categories?: Maybe<Recipe_Categories_Mutation_Response>;
  /** delete single row from the table: "recipe_categories" */
  delete_recipe_categories_by_pk?: Maybe<Recipe_Categories>;
  /** delete data from the table: "recipe_comments" */
  delete_recipe_comments?: Maybe<Recipe_Comments_Mutation_Response>;
  /** delete single row from the table: "recipe_comments" */
  delete_recipe_comments_by_pk?: Maybe<Recipe_Comments>;
  /** delete data from the table: "recipe_images" */
  delete_recipe_images?: Maybe<Recipe_Images_Mutation_Response>;
  /** delete single row from the table: "recipe_images" */
  delete_recipe_images_by_pk?: Maybe<Recipe_Images>;
  /** delete data from the table: "recipe_ingredients" */
  delete_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** delete single row from the table: "recipe_ingredients" */
  delete_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** delete data from the table: "recipe_likes" */
  delete_recipe_likes?: Maybe<Recipe_Likes_Mutation_Response>;
  /** delete single row from the table: "recipe_likes" */
  delete_recipe_likes_by_pk?: Maybe<Recipe_Likes>;
  /** delete data from the table: "recipe_purchases" */
  delete_recipe_purchases?: Maybe<Recipe_Purchases_Mutation_Response>;
  /** delete single row from the table: "recipe_purchases" */
  delete_recipe_purchases_by_pk?: Maybe<Recipe_Purchases>;
  /** delete data from the table: "recipe_ratings" */
  delete_recipe_ratings?: Maybe<Recipe_Ratings_Mutation_Response>;
  /** delete single row from the table: "recipe_ratings" */
  delete_recipe_ratings_by_pk?: Maybe<Recipe_Ratings>;
  /** delete data from the table: "recipe_steps" */
  delete_recipe_steps?: Maybe<Recipe_Steps_Mutation_Response>;
  /** delete single row from the table: "recipe_steps" */
  delete_recipe_steps_by_pk?: Maybe<Recipe_Steps>;
  /** delete data from the table: "recipes" */
  delete_recipes?: Maybe<Recipes_Mutation_Response>;
  /** delete single row from the table: "recipes" */
  delete_recipes_by_pk?: Maybe<Recipes>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "ingredients" */
  insert_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** insert a single row into the table: "ingredients" */
  insert_ingredients_one?: Maybe<Ingredients>;
  /** insert data into the table: "recipe_bookmarks" */
  insert_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** insert a single row into the table: "recipe_bookmarks" */
  insert_recipe_bookmarks_one?: Maybe<Recipe_Bookmarks>;
  /** insert data into the table: "recipe_categories" */
  insert_recipe_categories?: Maybe<Recipe_Categories_Mutation_Response>;
  /** insert a single row into the table: "recipe_categories" */
  insert_recipe_categories_one?: Maybe<Recipe_Categories>;
  /** insert data into the table: "recipe_comments" */
  insert_recipe_comments?: Maybe<Recipe_Comments_Mutation_Response>;
  /** insert a single row into the table: "recipe_comments" */
  insert_recipe_comments_one?: Maybe<Recipe_Comments>;
  /** insert data into the table: "recipe_images" */
  insert_recipe_images?: Maybe<Recipe_Images_Mutation_Response>;
  /** insert a single row into the table: "recipe_images" */
  insert_recipe_images_one?: Maybe<Recipe_Images>;
  /** insert data into the table: "recipe_ingredients" */
  insert_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** insert a single row into the table: "recipe_ingredients" */
  insert_recipe_ingredients_one?: Maybe<Recipe_Ingredients>;
  /** insert data into the table: "recipe_likes" */
  insert_recipe_likes?: Maybe<Recipe_Likes_Mutation_Response>;
  /** insert a single row into the table: "recipe_likes" */
  insert_recipe_likes_one?: Maybe<Recipe_Likes>;
  /** insert data into the table: "recipe_purchases" */
  insert_recipe_purchases?: Maybe<Recipe_Purchases_Mutation_Response>;
  /** insert a single row into the table: "recipe_purchases" */
  insert_recipe_purchases_one?: Maybe<Recipe_Purchases>;
  /** insert data into the table: "recipe_ratings" */
  insert_recipe_ratings?: Maybe<Recipe_Ratings_Mutation_Response>;
  /** insert a single row into the table: "recipe_ratings" */
  insert_recipe_ratings_one?: Maybe<Recipe_Ratings>;
  /** insert data into the table: "recipe_steps" */
  insert_recipe_steps?: Maybe<Recipe_Steps_Mutation_Response>;
  /** insert a single row into the table: "recipe_steps" */
  insert_recipe_steps_one?: Maybe<Recipe_Steps>;
  /** insert data into the table: "recipes" */
  insert_recipes?: Maybe<Recipes_Mutation_Response>;
  /** insert a single row into the table: "recipes" */
  insert_recipes_one?: Maybe<Recipes>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  login?: Maybe<LoginResponse>;
  register?: Maybe<AuthResponse>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update multiples rows of table: "categories" */
  update_categories_many?: Maybe<Array<Maybe<Categories_Mutation_Response>>>;
  /** update data of the table: "ingredients" */
  update_ingredients?: Maybe<Ingredients_Mutation_Response>;
  /** update single row of the table: "ingredients" */
  update_ingredients_by_pk?: Maybe<Ingredients>;
  /** update multiples rows of table: "ingredients" */
  update_ingredients_many?: Maybe<Array<Maybe<Ingredients_Mutation_Response>>>;
  /** update data of the table: "recipe_bookmarks" */
  update_recipe_bookmarks?: Maybe<Recipe_Bookmarks_Mutation_Response>;
  /** update single row of the table: "recipe_bookmarks" */
  update_recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** update multiples rows of table: "recipe_bookmarks" */
  update_recipe_bookmarks_many?: Maybe<Array<Maybe<Recipe_Bookmarks_Mutation_Response>>>;
  /** update data of the table: "recipe_categories" */
  update_recipe_categories?: Maybe<Recipe_Categories_Mutation_Response>;
  /** update single row of the table: "recipe_categories" */
  update_recipe_categories_by_pk?: Maybe<Recipe_Categories>;
  /** update multiples rows of table: "recipe_categories" */
  update_recipe_categories_many?: Maybe<Array<Maybe<Recipe_Categories_Mutation_Response>>>;
  /** update data of the table: "recipe_comments" */
  update_recipe_comments?: Maybe<Recipe_Comments_Mutation_Response>;
  /** update single row of the table: "recipe_comments" */
  update_recipe_comments_by_pk?: Maybe<Recipe_Comments>;
  /** update multiples rows of table: "recipe_comments" */
  update_recipe_comments_many?: Maybe<Array<Maybe<Recipe_Comments_Mutation_Response>>>;
  /** update data of the table: "recipe_images" */
  update_recipe_images?: Maybe<Recipe_Images_Mutation_Response>;
  /** update single row of the table: "recipe_images" */
  update_recipe_images_by_pk?: Maybe<Recipe_Images>;
  /** update multiples rows of table: "recipe_images" */
  update_recipe_images_many?: Maybe<Array<Maybe<Recipe_Images_Mutation_Response>>>;
  /** update data of the table: "recipe_ingredients" */
  update_recipe_ingredients?: Maybe<Recipe_Ingredients_Mutation_Response>;
  /** update single row of the table: "recipe_ingredients" */
  update_recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** update multiples rows of table: "recipe_ingredients" */
  update_recipe_ingredients_many?: Maybe<Array<Maybe<Recipe_Ingredients_Mutation_Response>>>;
  /** update data of the table: "recipe_likes" */
  update_recipe_likes?: Maybe<Recipe_Likes_Mutation_Response>;
  /** update single row of the table: "recipe_likes" */
  update_recipe_likes_by_pk?: Maybe<Recipe_Likes>;
  /** update multiples rows of table: "recipe_likes" */
  update_recipe_likes_many?: Maybe<Array<Maybe<Recipe_Likes_Mutation_Response>>>;
  /** update data of the table: "recipe_purchases" */
  update_recipe_purchases?: Maybe<Recipe_Purchases_Mutation_Response>;
  /** update single row of the table: "recipe_purchases" */
  update_recipe_purchases_by_pk?: Maybe<Recipe_Purchases>;
  /** update multiples rows of table: "recipe_purchases" */
  update_recipe_purchases_many?: Maybe<Array<Maybe<Recipe_Purchases_Mutation_Response>>>;
  /** update data of the table: "recipe_ratings" */
  update_recipe_ratings?: Maybe<Recipe_Ratings_Mutation_Response>;
  /** update single row of the table: "recipe_ratings" */
  update_recipe_ratings_by_pk?: Maybe<Recipe_Ratings>;
  /** update multiples rows of table: "recipe_ratings" */
  update_recipe_ratings_many?: Maybe<Array<Maybe<Recipe_Ratings_Mutation_Response>>>;
  /** update data of the table: "recipe_steps" */
  update_recipe_steps?: Maybe<Recipe_Steps_Mutation_Response>;
  /** update single row of the table: "recipe_steps" */
  update_recipe_steps_by_pk?: Maybe<Recipe_Steps>;
  /** update multiples rows of table: "recipe_steps" */
  update_recipe_steps_many?: Maybe<Array<Maybe<Recipe_Steps_Mutation_Response>>>;
  /** update data of the table: "recipes" */
  update_recipes?: Maybe<Recipes_Mutation_Response>;
  /** update single row of the table: "recipes" */
  update_recipes_by_pk?: Maybe<Recipes>;
  /** update multiples rows of table: "recipes" */
  update_recipes_many?: Maybe<Array<Maybe<Recipes_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_IngredientsArgs = {
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Ingredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_BookmarksArgs = {
  where: Recipe_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Bookmarks_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_CategoriesArgs = {
  where: Recipe_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Categories_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_CommentsArgs = {
  where: Recipe_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Comments_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_ImagesArgs = {
  where: Recipe_Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Images_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_IngredientsArgs = {
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ingredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_LikesArgs = {
  where: Recipe_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Likes_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_PurchasesArgs = {
  where: Recipe_Purchases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Purchases_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_RatingsArgs = {
  where: Recipe_Ratings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Ratings_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Recipe_StepsArgs = {
  where: Recipe_Steps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipe_Steps_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RecipesArgs = {
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Recipes_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IngredientsArgs = {
  objects: Array<Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Ingredients_OneArgs = {
  object: Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_BookmarksArgs = {
  objects: Array<Recipe_Bookmarks_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Bookmarks_OneArgs = {
  object: Recipe_Bookmarks_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_CategoriesArgs = {
  objects: Array<Recipe_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Categories_OneArgs = {
  object: Recipe_Categories_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_CommentsArgs = {
  objects: Array<Recipe_Comments_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Comments_OneArgs = {
  object: Recipe_Comments_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_ImagesArgs = {
  objects: Array<Recipe_Images_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Images_OneArgs = {
  object: Recipe_Images_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_IngredientsArgs = {
  objects: Array<Recipe_Ingredients_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ingredients_OneArgs = {
  object: Recipe_Ingredients_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_LikesArgs = {
  objects: Array<Recipe_Likes_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Likes_OneArgs = {
  object: Recipe_Likes_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Likes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_PurchasesArgs = {
  objects: Array<Recipe_Purchases_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Purchases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Purchases_OneArgs = {
  object: Recipe_Purchases_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Purchases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_RatingsArgs = {
  objects: Array<Recipe_Ratings_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Ratings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Ratings_OneArgs = {
  object: Recipe_Ratings_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Ratings_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_StepsArgs = {
  objects: Array<Recipe_Steps_Insert_Input>;
  on_conflict?: InputMaybe<Recipe_Steps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipe_Steps_OneArgs = {
  object: Recipe_Steps_Insert_Input;
  on_conflict?: InputMaybe<Recipe_Steps_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RecipesArgs = {
  objects: Array<Recipes_Insert_Input>;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Recipes_OneArgs = {
  object: Recipes_Insert_Input;
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootRegisterArgs = {
  email: Scalars['String']['input'];
  full_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: InputMaybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _set?: InputMaybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_ManyArgs = {
  updates: Array<Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_IngredientsArgs = {
  _set?: InputMaybe<Ingredients_Set_Input>;
  where: Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Ingredients_By_PkArgs = {
  _set?: InputMaybe<Ingredients_Set_Input>;
  pk_columns: Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Ingredients_ManyArgs = {
  updates: Array<Ingredients_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_BookmarksArgs = {
  _set?: InputMaybe<Recipe_Bookmarks_Set_Input>;
  where: Recipe_Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Bookmarks_By_PkArgs = {
  _set?: InputMaybe<Recipe_Bookmarks_Set_Input>;
  pk_columns: Recipe_Bookmarks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Bookmarks_ManyArgs = {
  updates: Array<Recipe_Bookmarks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_CategoriesArgs = {
  _set?: InputMaybe<Recipe_Categories_Set_Input>;
  where: Recipe_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Categories_By_PkArgs = {
  _set?: InputMaybe<Recipe_Categories_Set_Input>;
  pk_columns: Recipe_Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Categories_ManyArgs = {
  updates: Array<Recipe_Categories_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_CommentsArgs = {
  _set?: InputMaybe<Recipe_Comments_Set_Input>;
  where: Recipe_Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Comments_By_PkArgs = {
  _set?: InputMaybe<Recipe_Comments_Set_Input>;
  pk_columns: Recipe_Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Comments_ManyArgs = {
  updates: Array<Recipe_Comments_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_ImagesArgs = {
  _set?: InputMaybe<Recipe_Images_Set_Input>;
  where: Recipe_Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Images_By_PkArgs = {
  _set?: InputMaybe<Recipe_Images_Set_Input>;
  pk_columns: Recipe_Images_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Images_ManyArgs = {
  updates: Array<Recipe_Images_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_IngredientsArgs = {
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  where: Recipe_Ingredients_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredients_By_PkArgs = {
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  pk_columns: Recipe_Ingredients_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ingredients_ManyArgs = {
  updates: Array<Recipe_Ingredients_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_LikesArgs = {
  _set?: InputMaybe<Recipe_Likes_Set_Input>;
  where: Recipe_Likes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Likes_By_PkArgs = {
  _set?: InputMaybe<Recipe_Likes_Set_Input>;
  pk_columns: Recipe_Likes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Likes_ManyArgs = {
  updates: Array<Recipe_Likes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_PurchasesArgs = {
  _inc?: InputMaybe<Recipe_Purchases_Inc_Input>;
  _set?: InputMaybe<Recipe_Purchases_Set_Input>;
  where: Recipe_Purchases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Purchases_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Purchases_Inc_Input>;
  _set?: InputMaybe<Recipe_Purchases_Set_Input>;
  pk_columns: Recipe_Purchases_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Purchases_ManyArgs = {
  updates: Array<Recipe_Purchases_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_RatingsArgs = {
  _inc?: InputMaybe<Recipe_Ratings_Inc_Input>;
  _set?: InputMaybe<Recipe_Ratings_Set_Input>;
  where: Recipe_Ratings_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ratings_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Ratings_Inc_Input>;
  _set?: InputMaybe<Recipe_Ratings_Set_Input>;
  pk_columns: Recipe_Ratings_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Ratings_ManyArgs = {
  updates: Array<Recipe_Ratings_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_StepsArgs = {
  _inc?: InputMaybe<Recipe_Steps_Inc_Input>;
  _set?: InputMaybe<Recipe_Steps_Set_Input>;
  where: Recipe_Steps_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Steps_By_PkArgs = {
  _inc?: InputMaybe<Recipe_Steps_Inc_Input>;
  _set?: InputMaybe<Recipe_Steps_Set_Input>;
  pk_columns: Recipe_Steps_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipe_Steps_ManyArgs = {
  updates: Array<Recipe_Steps_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RecipesArgs = {
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  where: Recipes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Recipes_By_PkArgs = {
  _inc?: InputMaybe<Recipes_Inc_Input>;
  _set?: InputMaybe<Recipes_Set_Input>;
  pk_columns: Recipes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Recipes_ManyArgs = {
  updates: Array<Recipes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** fetch data from the table: "recipe_bookmarks" using primary key columns */
  recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** An array relationship */
  recipe_categories: Array<Recipe_Categories>;
  /** An aggregate relationship */
  recipe_categories_aggregate: Recipe_Categories_Aggregate;
  /** fetch data from the table: "recipe_categories" using primary key columns */
  recipe_categories_by_pk?: Maybe<Recipe_Categories>;
  /** An array relationship */
  recipe_comments: Array<Recipe_Comments>;
  /** An aggregate relationship */
  recipe_comments_aggregate: Recipe_Comments_Aggregate;
  /** fetch data from the table: "recipe_comments" using primary key columns */
  recipe_comments_by_pk?: Maybe<Recipe_Comments>;
  /** An array relationship */
  recipe_images: Array<Recipe_Images>;
  /** An aggregate relationship */
  recipe_images_aggregate: Recipe_Images_Aggregate;
  /** fetch data from the table: "recipe_images" using primary key columns */
  recipe_images_by_pk?: Maybe<Recipe_Images>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** An array relationship */
  recipe_likes: Array<Recipe_Likes>;
  /** An aggregate relationship */
  recipe_likes_aggregate: Recipe_Likes_Aggregate;
  /** fetch data from the table: "recipe_likes" using primary key columns */
  recipe_likes_by_pk?: Maybe<Recipe_Likes>;
  /** An array relationship */
  recipe_purchases: Array<Recipe_Purchases>;
  /** An aggregate relationship */
  recipe_purchases_aggregate: Recipe_Purchases_Aggregate;
  /** fetch data from the table: "recipe_purchases" using primary key columns */
  recipe_purchases_by_pk?: Maybe<Recipe_Purchases>;
  /** An array relationship */
  recipe_ratings: Array<Recipe_Ratings>;
  /** An aggregate relationship */
  recipe_ratings_aggregate: Recipe_Ratings_Aggregate;
  /** fetch data from the table: "recipe_ratings" using primary key columns */
  recipe_ratings_by_pk?: Maybe<Recipe_Ratings>;
  /** An array relationship */
  recipe_steps: Array<Recipe_Steps>;
  /** An aggregate relationship */
  recipe_steps_aggregate: Recipe_Steps_Aggregate;
  /** fetch data from the table: "recipe_steps" using primary key columns */
  recipe_steps_by_pk?: Maybe<Recipe_Steps>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Query_RootIngredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Query_RootRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Query_RootRecipe_Bookmarks_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


export type Query_RootRecipe_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


export type Query_RootRecipe_Categories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


export type Query_RootRecipe_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


export type Query_RootRecipe_Comments_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_ImagesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


export type Query_RootRecipe_Images_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


export type Query_RootRecipe_Images_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Query_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_LikesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


export type Query_RootRecipe_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


export type Query_RootRecipe_Likes_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_PurchasesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


export type Query_RootRecipe_Purchases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


export type Query_RootRecipe_Purchases_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_RatingsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


export type Query_RootRecipe_Ratings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


export type Query_RootRecipe_Ratings_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipe_StepsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


export type Query_RootRecipe_Steps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


export type Query_RootRecipe_Steps_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Query_RootRecipes_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "recipe_bookmarks" */
export type Recipe_Bookmarks = {
  __typename?: 'recipe_bookmarks';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate = {
  __typename?: 'recipe_bookmarks_aggregate';
  aggregate?: Maybe<Recipe_Bookmarks_Aggregate_Fields>;
  nodes: Array<Recipe_Bookmarks>;
};

export type Recipe_Bookmarks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Bookmarks_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Bookmarks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_Fields = {
  __typename?: 'recipe_bookmarks_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Bookmarks_Max_Fields>;
  min?: Maybe<Recipe_Bookmarks_Min_Fields>;
};


/** aggregate fields of "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Bookmarks_Max_Order_By>;
  min?: InputMaybe<Recipe_Bookmarks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_bookmarks" */
export type Recipe_Bookmarks_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Bookmarks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Bookmarks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_bookmarks". All fields are combined with a logical 'AND'. */
export type Recipe_Bookmarks_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Bookmarks_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Bookmarks_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeBookmarksPkey = 'recipe_bookmarks_pkey',
  /** unique or primary key constraint on columns "user_id", "recipe_id" */
  RecipeBookmarksRecipeIdUserIdKey = 'recipe_bookmarks_recipe_id_user_id_key'
}

/** input type for inserting data into table "recipe_bookmarks" */
export type Recipe_Bookmarks_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Bookmarks_Max_Fields = {
  __typename?: 'recipe_bookmarks_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Bookmarks_Min_Fields = {
  __typename?: 'recipe_bookmarks_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_bookmarks" */
export type Recipe_Bookmarks_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_bookmarks" */
export type Recipe_Bookmarks_Mutation_Response = {
  __typename?: 'recipe_bookmarks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Bookmarks>;
};

/** on_conflict condition type for table "recipe_bookmarks" */
export type Recipe_Bookmarks_On_Conflict = {
  constraint: Recipe_Bookmarks_Constraint;
  update_columns?: Array<Recipe_Bookmarks_Update_Column>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_bookmarks". */
export type Recipe_Bookmarks_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_bookmarks */
export type Recipe_Bookmarks_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_bookmarks" */
export type Recipe_Bookmarks_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_bookmarks" */
export type Recipe_Bookmarks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Bookmarks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Bookmarks_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_bookmarks" */
export enum Recipe_Bookmarks_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

export type Recipe_Bookmarks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Bookmarks_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Bookmarks_Bool_Exp;
};

/** columns and relationships of "recipe_categories" */
export type Recipe_Categories = {
  __typename?: 'recipe_categories';
  /** An object relationship */
  category?: Maybe<Categories>;
  category_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_categories" */
export type Recipe_Categories_Aggregate = {
  __typename?: 'recipe_categories_aggregate';
  aggregate?: Maybe<Recipe_Categories_Aggregate_Fields>;
  nodes: Array<Recipe_Categories>;
};

export type Recipe_Categories_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Categories_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Categories_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Categories_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_categories" */
export type Recipe_Categories_Aggregate_Fields = {
  __typename?: 'recipe_categories_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Categories_Max_Fields>;
  min?: Maybe<Recipe_Categories_Min_Fields>;
};


/** aggregate fields of "recipe_categories" */
export type Recipe_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_categories" */
export type Recipe_Categories_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Categories_Max_Order_By>;
  min?: InputMaybe<Recipe_Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_categories" */
export type Recipe_Categories_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Categories_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_categories". All fields are combined with a logical 'AND'. */
export type Recipe_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Categories_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Categories_Bool_Exp>>;
  category?: InputMaybe<Categories_Bool_Exp>;
  category_id?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_categories" */
export enum Recipe_Categories_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeCategoriesPkey = 'recipe_categories_pkey'
}

/** input type for inserting data into table "recipe_categories" */
export type Recipe_Categories_Insert_Input = {
  category?: InputMaybe<Categories_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Categories_Max_Fields = {
  __typename?: 'recipe_categories_max_fields';
  category_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_categories" */
export type Recipe_Categories_Max_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Categories_Min_Fields = {
  __typename?: 'recipe_categories_min_fields';
  category_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_categories" */
export type Recipe_Categories_Min_Order_By = {
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_categories" */
export type Recipe_Categories_Mutation_Response = {
  __typename?: 'recipe_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Categories>;
};

/** on_conflict condition type for table "recipe_categories" */
export type Recipe_Categories_On_Conflict = {
  constraint: Recipe_Categories_Constraint;
  update_columns?: Array<Recipe_Categories_Update_Column>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_categories". */
export type Recipe_Categories_Order_By = {
  category?: InputMaybe<Categories_Order_By>;
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_categories */
export type Recipe_Categories_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_categories" */
export enum Recipe_Categories_Select_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id'
}

/** input type for updating data in table "recipe_categories" */
export type Recipe_Categories_Set_Input = {
  category_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_categories" */
export type Recipe_Categories_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Categories_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Categories_Stream_Cursor_Value_Input = {
  category_id?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_categories" */
export enum Recipe_Categories_Update_Column {
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id'
}

export type Recipe_Categories_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Categories_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Categories_Bool_Exp;
};

/** columns and relationships of "recipe_comments" */
export type Recipe_Comments = {
  __typename?: 'recipe_comments';
  content: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_comments" */
export type Recipe_Comments_Aggregate = {
  __typename?: 'recipe_comments_aggregate';
  aggregate?: Maybe<Recipe_Comments_Aggregate_Fields>;
  nodes: Array<Recipe_Comments>;
};

export type Recipe_Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Comments_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Comments_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_comments" */
export type Recipe_Comments_Aggregate_Fields = {
  __typename?: 'recipe_comments_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Comments_Max_Fields>;
  min?: Maybe<Recipe_Comments_Min_Fields>;
};


/** aggregate fields of "recipe_comments" */
export type Recipe_Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_comments" */
export type Recipe_Comments_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Comments_Max_Order_By>;
  min?: InputMaybe<Recipe_Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_comments" */
export type Recipe_Comments_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Comments_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Comments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_comments". All fields are combined with a logical 'AND'. */
export type Recipe_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Comments_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Comments_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Comments_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_comments" */
export enum Recipe_Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeCommentsPkey = 'recipe_comments_pkey'
}

/** input type for inserting data into table "recipe_comments" */
export type Recipe_Comments_Insert_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Comments_Max_Fields = {
  __typename?: 'recipe_comments_max_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_comments" */
export type Recipe_Comments_Max_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Comments_Min_Fields = {
  __typename?: 'recipe_comments_min_fields';
  content?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_comments" */
export type Recipe_Comments_Min_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_comments" */
export type Recipe_Comments_Mutation_Response = {
  __typename?: 'recipe_comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Comments>;
};

/** on_conflict condition type for table "recipe_comments" */
export type Recipe_Comments_On_Conflict = {
  constraint: Recipe_Comments_Constraint;
  update_columns?: Array<Recipe_Comments_Update_Column>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_comments". */
export type Recipe_Comments_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_comments */
export type Recipe_Comments_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_comments" */
export enum Recipe_Comments_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_comments" */
export type Recipe_Comments_Set_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_comments" */
export type Recipe_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Comments_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Comments_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_comments" */
export enum Recipe_Comments_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Recipe_Comments_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Comments_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Comments_Bool_Exp;
};

/** columns and relationships of "recipe_images" */
export type Recipe_Images = {
  __typename?: 'recipe_images';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  image_url: Scalars['String']['output'];
  is_featured?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_images" */
export type Recipe_Images_Aggregate = {
  __typename?: 'recipe_images_aggregate';
  aggregate?: Maybe<Recipe_Images_Aggregate_Fields>;
  nodes: Array<Recipe_Images>;
};

export type Recipe_Images_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Recipe_Images_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Recipe_Images_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Recipe_Images_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Images_Aggregate_Bool_Exp_Bool_And = {
  arguments: Recipe_Images_Select_Column_Recipe_Images_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Images_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Recipe_Images_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Recipe_Images_Select_Column_Recipe_Images_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Images_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Recipe_Images_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Images_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_images" */
export type Recipe_Images_Aggregate_Fields = {
  __typename?: 'recipe_images_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Images_Max_Fields>;
  min?: Maybe<Recipe_Images_Min_Fields>;
};


/** aggregate fields of "recipe_images" */
export type Recipe_Images_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_images" */
export type Recipe_Images_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Images_Max_Order_By>;
  min?: InputMaybe<Recipe_Images_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_images" */
export type Recipe_Images_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Images_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Images_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_images". All fields are combined with a logical 'AND'. */
export type Recipe_Images_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Images_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Images_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Images_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  is_featured?: InputMaybe<Boolean_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_images" */
export enum Recipe_Images_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeImagesPkey = 'recipe_images_pkey'
}

/** input type for inserting data into table "recipe_images" */
export type Recipe_Images_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Images_Max_Fields = {
  __typename?: 'recipe_images_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_images" */
export type Recipe_Images_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Images_Min_Fields = {
  __typename?: 'recipe_images_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_images" */
export type Recipe_Images_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_images" */
export type Recipe_Images_Mutation_Response = {
  __typename?: 'recipe_images_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Images>;
};

/** on_conflict condition type for table "recipe_images" */
export type Recipe_Images_On_Conflict = {
  constraint: Recipe_Images_Constraint;
  update_columns?: Array<Recipe_Images_Update_Column>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_images". */
export type Recipe_Images_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  is_featured?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_images */
export type Recipe_Images_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_images" */
export enum Recipe_Images_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  IsFeatured = 'is_featured',
  /** column name */
  RecipeId = 'recipe_id'
}

/** select "recipe_images_aggregate_bool_exp_bool_and_arguments_columns" columns of table "recipe_images" */
export enum Recipe_Images_Select_Column_Recipe_Images_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsFeatured = 'is_featured'
}

/** select "recipe_images_aggregate_bool_exp_bool_or_arguments_columns" columns of table "recipe_images" */
export enum Recipe_Images_Select_Column_Recipe_Images_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsFeatured = 'is_featured'
}

/** input type for updating data in table "recipe_images" */
export type Recipe_Images_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_images" */
export type Recipe_Images_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Images_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Images_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  is_featured?: InputMaybe<Scalars['Boolean']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_images" */
export enum Recipe_Images_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  IsFeatured = 'is_featured',
  /** column name */
  RecipeId = 'recipe_id'
}

export type Recipe_Images_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Images_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Images_Bool_Exp;
};

/** columns and relationships of "recipe_ingredients" */
export type Recipe_Ingredients = {
  __typename?: 'recipe_ingredients';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  ingredient?: Maybe<Ingredients>;
  ingredient_id?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate = {
  __typename?: 'recipe_ingredients_aggregate';
  aggregate?: Maybe<Recipe_Ingredients_Aggregate_Fields>;
  nodes: Array<Recipe_Ingredients>;
};

export type Recipe_Ingredients_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Ingredients_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Ingredients_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Fields = {
  __typename?: 'recipe_ingredients_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Ingredients_Max_Fields>;
  min?: Maybe<Recipe_Ingredients_Min_Fields>;
};


/** aggregate fields of "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_ingredients" */
export type Recipe_Ingredients_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ingredients_Max_Order_By>;
  min?: InputMaybe<Recipe_Ingredients_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ingredients" */
export type Recipe_Ingredients_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ingredients_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Ingredients_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_ingredients". All fields are combined with a logical 'AND'. */
export type Recipe_Ingredients_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ingredients_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  ingredient?: InputMaybe<Ingredients_Bool_Exp>;
  ingredient_id?: InputMaybe<String_Comparison_Exp>;
  quantity?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  unit?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_ingredients" */
export enum Recipe_Ingredients_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeIngredientsPkey = 'recipe_ingredients_pkey',
  /** unique or primary key constraint on columns "ingredient_id", "recipe_id" */
  RecipeIngredientsRecipeIdIngredientIdKey = 'recipe_ingredients_recipe_id_ingredient_id_key'
}

/** input type for inserting data into table "recipe_ingredients" */
export type Recipe_Ingredients_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<Ingredients_Obj_Rel_Insert_Input>;
  ingredient_id?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Ingredients_Max_Fields = {
  __typename?: 'recipe_ingredients_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ingredient_id?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ingredients_Min_Fields = {
  __typename?: 'recipe_ingredients_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ingredient_id?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_ingredients" */
export type Recipe_Ingredients_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ingredients" */
export type Recipe_Ingredients_Mutation_Response = {
  __typename?: 'recipe_ingredients_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ingredients>;
};

/** on_conflict condition type for table "recipe_ingredients" */
export type Recipe_Ingredients_On_Conflict = {
  constraint: Recipe_Ingredients_Constraint;
  update_columns?: Array<Recipe_Ingredients_Update_Column>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ingredients". */
export type Recipe_Ingredients_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ingredient?: InputMaybe<Ingredients_Order_By>;
  ingredient_id?: InputMaybe<Order_By>;
  quantity?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  unit?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_ingredients */
export type Recipe_Ingredients_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IngredientId = 'ingredient_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Unit = 'unit'
}

/** input type for updating data in table "recipe_ingredients" */
export type Recipe_Ingredients_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ingredient_id?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_ingredients" */
export type Recipe_Ingredients_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Ingredients_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Ingredients_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ingredient_id?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_ingredients" */
export enum Recipe_Ingredients_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IngredientId = 'ingredient_id',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Unit = 'unit'
}

export type Recipe_Ingredients_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Ingredients_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Ingredients_Bool_Exp;
};

/** columns and relationships of "recipe_likes" */
export type Recipe_Likes = {
  __typename?: 'recipe_likes';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_likes" */
export type Recipe_Likes_Aggregate = {
  __typename?: 'recipe_likes_aggregate';
  aggregate?: Maybe<Recipe_Likes_Aggregate_Fields>;
  nodes: Array<Recipe_Likes>;
};

export type Recipe_Likes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Likes_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Likes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Likes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_likes" */
export type Recipe_Likes_Aggregate_Fields = {
  __typename?: 'recipe_likes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Likes_Max_Fields>;
  min?: Maybe<Recipe_Likes_Min_Fields>;
};


/** aggregate fields of "recipe_likes" */
export type Recipe_Likes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_likes" */
export type Recipe_Likes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Likes_Max_Order_By>;
  min?: InputMaybe<Recipe_Likes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_likes" */
export type Recipe_Likes_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Likes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Likes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "recipe_likes". All fields are combined with a logical 'AND'. */
export type Recipe_Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Likes_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Likes_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_likes" */
export enum Recipe_Likes_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeLikesPkey = 'recipe_likes_pkey',
  /** unique or primary key constraint on columns "user_id", "recipe_id" */
  RecipeLikesRecipeIdUserIdKey = 'recipe_likes_recipe_id_user_id_key'
}

/** input type for inserting data into table "recipe_likes" */
export type Recipe_Likes_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Likes_Max_Fields = {
  __typename?: 'recipe_likes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_likes" */
export type Recipe_Likes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Likes_Min_Fields = {
  __typename?: 'recipe_likes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_likes" */
export type Recipe_Likes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_likes" */
export type Recipe_Likes_Mutation_Response = {
  __typename?: 'recipe_likes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Likes>;
};

/** on_conflict condition type for table "recipe_likes" */
export type Recipe_Likes_On_Conflict = {
  constraint: Recipe_Likes_Constraint;
  update_columns?: Array<Recipe_Likes_Update_Column>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_likes". */
export type Recipe_Likes_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_likes */
export type Recipe_Likes_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_likes" */
export enum Recipe_Likes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_likes" */
export type Recipe_Likes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "recipe_likes" */
export type Recipe_Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Likes_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "recipe_likes" */
export enum Recipe_Likes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

export type Recipe_Likes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Likes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Likes_Bool_Exp;
};

/** columns and relationships of "recipe_purchases" */
export type Recipe_Purchases = {
  __typename?: 'recipe_purchases';
  amount: Scalars['numeric']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  transaction_id: Scalars['String']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_purchases" */
export type Recipe_Purchases_Aggregate = {
  __typename?: 'recipe_purchases_aggregate';
  aggregate?: Maybe<Recipe_Purchases_Aggregate_Fields>;
  nodes: Array<Recipe_Purchases>;
};

export type Recipe_Purchases_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Purchases_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Purchases_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Purchases_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_purchases" */
export type Recipe_Purchases_Aggregate_Fields = {
  __typename?: 'recipe_purchases_aggregate_fields';
  avg?: Maybe<Recipe_Purchases_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Purchases_Max_Fields>;
  min?: Maybe<Recipe_Purchases_Min_Fields>;
  stddev?: Maybe<Recipe_Purchases_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Purchases_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Purchases_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Purchases_Sum_Fields>;
  var_pop?: Maybe<Recipe_Purchases_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Purchases_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Purchases_Variance_Fields>;
};


/** aggregate fields of "recipe_purchases" */
export type Recipe_Purchases_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_purchases" */
export type Recipe_Purchases_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Purchases_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Purchases_Max_Order_By>;
  min?: InputMaybe<Recipe_Purchases_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Purchases_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Purchases_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Purchases_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Purchases_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Purchases_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Purchases_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Purchases_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_purchases" */
export type Recipe_Purchases_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Purchases_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Purchases_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Purchases_Avg_Fields = {
  __typename?: 'recipe_purchases_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_purchases". All fields are combined with a logical 'AND'. */
export type Recipe_Purchases_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Purchases_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Purchases_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Purchases_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  transaction_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_purchases" */
export enum Recipe_Purchases_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipePurchasesPkey = 'recipe_purchases_pkey'
}

/** input type for incrementing numeric columns in table "recipe_purchases" */
export type Recipe_Purchases_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "recipe_purchases" */
export type Recipe_Purchases_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Purchases_Max_Fields = {
  __typename?: 'recipe_purchases_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transaction_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transaction_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Purchases_Min_Fields = {
  __typename?: 'recipe_purchases_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  transaction_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transaction_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_purchases" */
export type Recipe_Purchases_Mutation_Response = {
  __typename?: 'recipe_purchases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Purchases>;
};

/** on_conflict condition type for table "recipe_purchases" */
export type Recipe_Purchases_On_Conflict = {
  constraint: Recipe_Purchases_Constraint;
  update_columns?: Array<Recipe_Purchases_Update_Column>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_purchases". */
export type Recipe_Purchases_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transaction_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_purchases */
export type Recipe_Purchases_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_purchases" */
export enum Recipe_Purchases_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_purchases" */
export type Recipe_Purchases_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Recipe_Purchases_Stddev_Fields = {
  __typename?: 'recipe_purchases_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Purchases_Stddev_Pop_Fields = {
  __typename?: 'recipe_purchases_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Purchases_Stddev_Samp_Fields = {
  __typename?: 'recipe_purchases_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "recipe_purchases" */
export type Recipe_Purchases_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Purchases_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Purchases_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  transaction_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Recipe_Purchases_Sum_Fields = {
  __typename?: 'recipe_purchases_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_purchases" */
export enum Recipe_Purchases_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionId = 'transaction_id',
  /** column name */
  UserId = 'user_id'
}

export type Recipe_Purchases_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Recipe_Purchases_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Purchases_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Purchases_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Recipe_Purchases_Var_Pop_Fields = {
  __typename?: 'recipe_purchases_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Purchases_Var_Samp_Fields = {
  __typename?: 'recipe_purchases_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Purchases_Variance_Fields = {
  __typename?: 'recipe_purchases_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recipe_purchases" */
export type Recipe_Purchases_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_ratings" */
export type Recipe_Ratings = {
  __typename?: 'recipe_ratings';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "recipe_ratings" */
export type Recipe_Ratings_Aggregate = {
  __typename?: 'recipe_ratings_aggregate';
  aggregate?: Maybe<Recipe_Ratings_Aggregate_Fields>;
  nodes: Array<Recipe_Ratings>;
};

export type Recipe_Ratings_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Ratings_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Ratings_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Ratings_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_ratings" */
export type Recipe_Ratings_Aggregate_Fields = {
  __typename?: 'recipe_ratings_aggregate_fields';
  avg?: Maybe<Recipe_Ratings_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Ratings_Max_Fields>;
  min?: Maybe<Recipe_Ratings_Min_Fields>;
  stddev?: Maybe<Recipe_Ratings_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Ratings_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Ratings_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Ratings_Sum_Fields>;
  var_pop?: Maybe<Recipe_Ratings_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Ratings_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Ratings_Variance_Fields>;
};


/** aggregate fields of "recipe_ratings" */
export type Recipe_Ratings_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_ratings" */
export type Recipe_Ratings_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Ratings_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Ratings_Max_Order_By>;
  min?: InputMaybe<Recipe_Ratings_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Ratings_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Ratings_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Ratings_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Ratings_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Ratings_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Ratings_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Ratings_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_ratings" */
export type Recipe_Ratings_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Ratings_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Ratings_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Ratings_Avg_Fields = {
  __typename?: 'recipe_ratings_avg_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Avg_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_ratings". All fields are combined with a logical 'AND'. */
export type Recipe_Ratings_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Ratings_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Ratings_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Ratings_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  rating?: InputMaybe<Int_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_ratings" */
export enum Recipe_Ratings_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeRatingsPkey = 'recipe_ratings_pkey'
}

/** input type for incrementing numeric columns in table "recipe_ratings" */
export type Recipe_Ratings_Inc_Input = {
  rating?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "recipe_ratings" */
export type Recipe_Ratings_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipe_Ratings_Max_Fields = {
  __typename?: 'recipe_ratings_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rating?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Ratings_Min_Fields = {
  __typename?: 'recipe_ratings_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rating?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_ratings" */
export type Recipe_Ratings_Mutation_Response = {
  __typename?: 'recipe_ratings_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Ratings>;
};

/** on_conflict condition type for table "recipe_ratings" */
export type Recipe_Ratings_On_Conflict = {
  constraint: Recipe_Ratings_Constraint;
  update_columns?: Array<Recipe_Ratings_Update_Column>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_ratings". */
export type Recipe_Ratings_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  rating?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_ratings */
export type Recipe_Ratings_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_ratings" */
export enum Recipe_Ratings_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Rating = 'rating',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipe_ratings" */
export type Recipe_Ratings_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Recipe_Ratings_Stddev_Fields = {
  __typename?: 'recipe_ratings_stddev_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Stddev_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Ratings_Stddev_Pop_Fields = {
  __typename?: 'recipe_ratings_stddev_pop_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Stddev_Pop_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Ratings_Stddev_Samp_Fields = {
  __typename?: 'recipe_ratings_stddev_samp_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Stddev_Samp_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "recipe_ratings" */
export type Recipe_Ratings_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Ratings_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Ratings_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Recipe_Ratings_Sum_Fields = {
  __typename?: 'recipe_ratings_sum_fields';
  rating?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Sum_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_ratings" */
export enum Recipe_Ratings_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Rating = 'rating',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  UserId = 'user_id'
}

export type Recipe_Ratings_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Recipe_Ratings_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Ratings_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Ratings_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Recipe_Ratings_Var_Pop_Fields = {
  __typename?: 'recipe_ratings_var_pop_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Var_Pop_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Ratings_Var_Samp_Fields = {
  __typename?: 'recipe_ratings_var_samp_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Var_Samp_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Ratings_Variance_Fields = {
  __typename?: 'recipe_ratings_variance_fields';
  rating?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recipe_ratings" */
export type Recipe_Ratings_Variance_Order_By = {
  rating?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipe_steps" */
export type Recipe_Steps = {
  __typename?: 'recipe_steps';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  recipe?: Maybe<Recipes>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  step_number: Scalars['Int']['output'];
};

/** aggregated selection of "recipe_steps" */
export type Recipe_Steps_Aggregate = {
  __typename?: 'recipe_steps_aggregate';
  aggregate?: Maybe<Recipe_Steps_Aggregate_Fields>;
  nodes: Array<Recipe_Steps>;
};

export type Recipe_Steps_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipe_Steps_Aggregate_Bool_Exp_Count>;
};

export type Recipe_Steps_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipe_Steps_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipe_steps" */
export type Recipe_Steps_Aggregate_Fields = {
  __typename?: 'recipe_steps_aggregate_fields';
  avg?: Maybe<Recipe_Steps_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Recipe_Steps_Max_Fields>;
  min?: Maybe<Recipe_Steps_Min_Fields>;
  stddev?: Maybe<Recipe_Steps_Stddev_Fields>;
  stddev_pop?: Maybe<Recipe_Steps_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipe_Steps_Stddev_Samp_Fields>;
  sum?: Maybe<Recipe_Steps_Sum_Fields>;
  var_pop?: Maybe<Recipe_Steps_Var_Pop_Fields>;
  var_samp?: Maybe<Recipe_Steps_Var_Samp_Fields>;
  variance?: Maybe<Recipe_Steps_Variance_Fields>;
};


/** aggregate fields of "recipe_steps" */
export type Recipe_Steps_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipe_steps" */
export type Recipe_Steps_Aggregate_Order_By = {
  avg?: InputMaybe<Recipe_Steps_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipe_Steps_Max_Order_By>;
  min?: InputMaybe<Recipe_Steps_Min_Order_By>;
  stddev?: InputMaybe<Recipe_Steps_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipe_Steps_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipe_Steps_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipe_Steps_Sum_Order_By>;
  var_pop?: InputMaybe<Recipe_Steps_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipe_Steps_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipe_Steps_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipe_steps" */
export type Recipe_Steps_Arr_Rel_Insert_Input = {
  data: Array<Recipe_Steps_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipe_Steps_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipe_Steps_Avg_Fields = {
  __typename?: 'recipe_steps_avg_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recipe_steps" */
export type Recipe_Steps_Avg_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipe_steps". All fields are combined with a logical 'AND'. */
export type Recipe_Steps_Bool_Exp = {
  _and?: InputMaybe<Array<Recipe_Steps_Bool_Exp>>;
  _not?: InputMaybe<Recipe_Steps_Bool_Exp>;
  _or?: InputMaybe<Array<Recipe_Steps_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  image_url?: InputMaybe<String_Comparison_Exp>;
  recipe?: InputMaybe<Recipes_Bool_Exp>;
  recipe_id?: InputMaybe<String_Comparison_Exp>;
  step_number?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipe_steps" */
export enum Recipe_Steps_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipeStepsPkey = 'recipe_steps_pkey',
  /** unique or primary key constraint on columns "step_number", "recipe_id" */
  RecipeStepsRecipeIdStepNumberKey = 'recipe_steps_recipe_id_step_number_key'
}

/** input type for incrementing numeric columns in table "recipe_steps" */
export type Recipe_Steps_Inc_Input = {
  step_number?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "recipe_steps" */
export type Recipe_Steps_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  recipe?: InputMaybe<Recipes_Obj_Rel_Insert_Input>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  step_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Recipe_Steps_Max_Fields = {
  __typename?: 'recipe_steps_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  step_number?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "recipe_steps" */
export type Recipe_Steps_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  step_number?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipe_Steps_Min_Fields = {
  __typename?: 'recipe_steps_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  recipe_id?: Maybe<Scalars['String']['output']>;
  step_number?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "recipe_steps" */
export type Recipe_Steps_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  step_number?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipe_steps" */
export type Recipe_Steps_Mutation_Response = {
  __typename?: 'recipe_steps_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipe_Steps>;
};

/** on_conflict condition type for table "recipe_steps" */
export type Recipe_Steps_On_Conflict = {
  constraint: Recipe_Steps_Constraint;
  update_columns?: Array<Recipe_Steps_Update_Column>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};

/** Ordering options when selecting data from "recipe_steps". */
export type Recipe_Steps_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_url?: InputMaybe<Order_By>;
  recipe?: InputMaybe<Recipes_Order_By>;
  recipe_id?: InputMaybe<Order_By>;
  step_number?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipe_steps */
export type Recipe_Steps_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipe_steps" */
export enum Recipe_Steps_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  StepNumber = 'step_number'
}

/** input type for updating data in table "recipe_steps" */
export type Recipe_Steps_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  step_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Recipe_Steps_Stddev_Fields = {
  __typename?: 'recipe_steps_stddev_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recipe_steps" */
export type Recipe_Steps_Stddev_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipe_Steps_Stddev_Pop_Fields = {
  __typename?: 'recipe_steps_stddev_pop_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recipe_steps" */
export type Recipe_Steps_Stddev_Pop_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipe_Steps_Stddev_Samp_Fields = {
  __typename?: 'recipe_steps_stddev_samp_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recipe_steps" */
export type Recipe_Steps_Stddev_Samp_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "recipe_steps" */
export type Recipe_Steps_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipe_Steps_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipe_Steps_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  recipe_id?: InputMaybe<Scalars['String']['input']>;
  step_number?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Recipe_Steps_Sum_Fields = {
  __typename?: 'recipe_steps_sum_fields';
  step_number?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "recipe_steps" */
export type Recipe_Steps_Sum_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** update columns of table "recipe_steps" */
export enum Recipe_Steps_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  RecipeId = 'recipe_id',
  /** column name */
  StepNumber = 'step_number'
}

export type Recipe_Steps_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Recipe_Steps_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipe_Steps_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipe_Steps_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Recipe_Steps_Var_Pop_Fields = {
  __typename?: 'recipe_steps_var_pop_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recipe_steps" */
export type Recipe_Steps_Var_Pop_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipe_Steps_Var_Samp_Fields = {
  __typename?: 'recipe_steps_var_samp_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recipe_steps" */
export type Recipe_Steps_Var_Samp_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipe_Steps_Variance_Fields = {
  __typename?: 'recipe_steps_variance_fields';
  step_number?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recipe_steps" */
export type Recipe_Steps_Variance_Order_By = {
  step_number?: InputMaybe<Order_By>;
};

/** columns and relationships of "recipes" */
export type Recipes = {
  __typename?: 'recipes';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  featured_image: Scalars['String']['output'];
  id: Scalars['String']['output'];
  preparation_time: Scalars['Int']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** An array relationship */
  recipe_categories: Array<Recipe_Categories>;
  /** An aggregate relationship */
  recipe_categories_aggregate: Recipe_Categories_Aggregate;
  /** An array relationship */
  recipe_comments: Array<Recipe_Comments>;
  /** An aggregate relationship */
  recipe_comments_aggregate: Recipe_Comments_Aggregate;
  /** An array relationship */
  recipe_images: Array<Recipe_Images>;
  /** An aggregate relationship */
  recipe_images_aggregate: Recipe_Images_Aggregate;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** An array relationship */
  recipe_likes: Array<Recipe_Likes>;
  /** An aggregate relationship */
  recipe_likes_aggregate: Recipe_Likes_Aggregate;
  /** An array relationship */
  recipe_purchases: Array<Recipe_Purchases>;
  /** An aggregate relationship */
  recipe_purchases_aggregate: Recipe_Purchases_Aggregate;
  /** An array relationship */
  recipe_ratings: Array<Recipe_Ratings>;
  /** An aggregate relationship */
  recipe_ratings_aggregate: Recipe_Ratings_Aggregate;
  /** An array relationship */
  recipe_steps: Array<Recipe_Steps>;
  /** An aggregate relationship */
  recipe_steps_aggregate: Recipe_Steps_Aggregate;
  servings?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_ImagesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Images_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_LikesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_PurchasesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Purchases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_RatingsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Ratings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_StepsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


/** columns and relationships of "recipes" */
export type RecipesRecipe_Steps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};

/** aggregated selection of "recipes" */
export type Recipes_Aggregate = {
  __typename?: 'recipes_aggregate';
  aggregate?: Maybe<Recipes_Aggregate_Fields>;
  nodes: Array<Recipes>;
};

export type Recipes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Recipes_Aggregate_Bool_Exp_Count>;
};

export type Recipes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Recipes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Recipes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "recipes" */
export type Recipes_Aggregate_Fields = {
  __typename?: 'recipes_aggregate_fields';
  avg?: Maybe<Recipes_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Recipes_Max_Fields>;
  min?: Maybe<Recipes_Min_Fields>;
  stddev?: Maybe<Recipes_Stddev_Fields>;
  stddev_pop?: Maybe<Recipes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Recipes_Stddev_Samp_Fields>;
  sum?: Maybe<Recipes_Sum_Fields>;
  var_pop?: Maybe<Recipes_Var_Pop_Fields>;
  var_samp?: Maybe<Recipes_Var_Samp_Fields>;
  variance?: Maybe<Recipes_Variance_Fields>;
};


/** aggregate fields of "recipes" */
export type Recipes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Recipes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "recipes" */
export type Recipes_Aggregate_Order_By = {
  avg?: InputMaybe<Recipes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Recipes_Max_Order_By>;
  min?: InputMaybe<Recipes_Min_Order_By>;
  stddev?: InputMaybe<Recipes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Recipes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Recipes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Recipes_Sum_Order_By>;
  var_pop?: InputMaybe<Recipes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Recipes_Var_Samp_Order_By>;
  variance?: InputMaybe<Recipes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "recipes" */
export type Recipes_Arr_Rel_Insert_Input = {
  data: Array<Recipes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** aggregate avg on columns */
export type Recipes_Avg_Fields = {
  __typename?: 'recipes_avg_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "recipes" */
export type Recipes_Avg_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "recipes". All fields are combined with a logical 'AND'. */
export type Recipes_Bool_Exp = {
  _and?: InputMaybe<Array<Recipes_Bool_Exp>>;
  _not?: InputMaybe<Recipes_Bool_Exp>;
  _or?: InputMaybe<Array<Recipes_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  difficulty?: InputMaybe<String_Comparison_Exp>;
  featured_image?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  preparation_time?: InputMaybe<Int_Comparison_Exp>;
  price?: InputMaybe<Float_Comparison_Exp>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Bool_Exp>;
  recipe_categories?: InputMaybe<Recipe_Categories_Bool_Exp>;
  recipe_categories_aggregate?: InputMaybe<Recipe_Categories_Aggregate_Bool_Exp>;
  recipe_comments?: InputMaybe<Recipe_Comments_Bool_Exp>;
  recipe_comments_aggregate?: InputMaybe<Recipe_Comments_Aggregate_Bool_Exp>;
  recipe_images?: InputMaybe<Recipe_Images_Bool_Exp>;
  recipe_images_aggregate?: InputMaybe<Recipe_Images_Aggregate_Bool_Exp>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Bool_Exp>;
  recipe_likes?: InputMaybe<Recipe_Likes_Bool_Exp>;
  recipe_likes_aggregate?: InputMaybe<Recipe_Likes_Aggregate_Bool_Exp>;
  recipe_purchases?: InputMaybe<Recipe_Purchases_Bool_Exp>;
  recipe_purchases_aggregate?: InputMaybe<Recipe_Purchases_Aggregate_Bool_Exp>;
  recipe_ratings?: InputMaybe<Recipe_Ratings_Bool_Exp>;
  recipe_ratings_aggregate?: InputMaybe<Recipe_Ratings_Aggregate_Bool_Exp>;
  recipe_steps?: InputMaybe<Recipe_Steps_Bool_Exp>;
  recipe_steps_aggregate?: InputMaybe<Recipe_Steps_Aggregate_Bool_Exp>;
  servings?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "recipes" */
export enum Recipes_Constraint {
  /** unique or primary key constraint on columns "id" */
  RecipesPkey = 'recipes_pkey'
}

/** input type for incrementing numeric columns in table "recipes" */
export type Recipes_Inc_Input = {
  preparation_time?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  servings?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "recipes" */
export type Recipes_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  featured_image?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  preparation_time?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Arr_Rel_Insert_Input>;
  recipe_categories?: InputMaybe<Recipe_Categories_Arr_Rel_Insert_Input>;
  recipe_comments?: InputMaybe<Recipe_Comments_Arr_Rel_Insert_Input>;
  recipe_images?: InputMaybe<Recipe_Images_Arr_Rel_Insert_Input>;
  recipe_ingredients?: InputMaybe<Recipe_Ingredients_Arr_Rel_Insert_Input>;
  recipe_likes?: InputMaybe<Recipe_Likes_Arr_Rel_Insert_Input>;
  recipe_purchases?: InputMaybe<Recipe_Purchases_Arr_Rel_Insert_Input>;
  recipe_ratings?: InputMaybe<Recipe_Ratings_Arr_Rel_Insert_Input>;
  recipe_steps?: InputMaybe<Recipe_Steps_Arr_Rel_Insert_Input>;
  servings?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Recipes_Max_Fields = {
  __typename?: 'recipes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  featured_image?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  preparation_time?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "recipes" */
export type Recipes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  featured_image?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Recipes_Min_Fields = {
  __typename?: 'recipes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  difficulty?: Maybe<Scalars['String']['output']>;
  featured_image?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  preparation_time?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "recipes" */
export type Recipes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  featured_image?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "recipes" */
export type Recipes_Mutation_Response = {
  __typename?: 'recipes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Recipes>;
};

/** input type for inserting object relation for remote table "recipes" */
export type Recipes_Obj_Rel_Insert_Input = {
  data: Recipes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Recipes_On_Conflict>;
};

/** on_conflict condition type for table "recipes" */
export type Recipes_On_Conflict = {
  constraint: Recipes_Constraint;
  update_columns?: Array<Recipes_Update_Column>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** Ordering options when selecting data from "recipes". */
export type Recipes_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  difficulty?: InputMaybe<Order_By>;
  featured_image?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Order_By>;
  recipe_categories_aggregate?: InputMaybe<Recipe_Categories_Aggregate_Order_By>;
  recipe_comments_aggregate?: InputMaybe<Recipe_Comments_Aggregate_Order_By>;
  recipe_images_aggregate?: InputMaybe<Recipe_Images_Aggregate_Order_By>;
  recipe_ingredients_aggregate?: InputMaybe<Recipe_Ingredients_Aggregate_Order_By>;
  recipe_likes_aggregate?: InputMaybe<Recipe_Likes_Aggregate_Order_By>;
  recipe_purchases_aggregate?: InputMaybe<Recipe_Purchases_Aggregate_Order_By>;
  recipe_ratings_aggregate?: InputMaybe<Recipe_Ratings_Aggregate_Order_By>;
  recipe_steps_aggregate?: InputMaybe<Recipe_Steps_Aggregate_Order_By>;
  servings?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: recipes */
export type Recipes_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "recipes" */
export enum Recipes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Difficulty = 'difficulty',
  /** column name */
  FeaturedImage = 'featured_image',
  /** column name */
  Id = 'id',
  /** column name */
  PreparationTime = 'preparation_time',
  /** column name */
  Price = 'price',
  /** column name */
  Servings = 'servings',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "recipes" */
export type Recipes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  featured_image?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  preparation_time?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  servings?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Recipes_Stddev_Fields = {
  __typename?: 'recipes_stddev_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "recipes" */
export type Recipes_Stddev_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Recipes_Stddev_Pop_Fields = {
  __typename?: 'recipes_stddev_pop_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "recipes" */
export type Recipes_Stddev_Pop_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Recipes_Stddev_Samp_Fields = {
  __typename?: 'recipes_stddev_samp_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "recipes" */
export type Recipes_Stddev_Samp_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "recipes" */
export type Recipes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Recipes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Recipes_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  featured_image?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  preparation_time?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  servings?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Recipes_Sum_Fields = {
  __typename?: 'recipes_sum_fields';
  preparation_time?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "recipes" */
export type Recipes_Sum_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** update columns of table "recipes" */
export enum Recipes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Difficulty = 'difficulty',
  /** column name */
  FeaturedImage = 'featured_image',
  /** column name */
  Id = 'id',
  /** column name */
  PreparationTime = 'preparation_time',
  /** column name */
  Price = 'price',
  /** column name */
  Servings = 'servings',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Recipes_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Recipes_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Recipes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Recipes_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Recipes_Var_Pop_Fields = {
  __typename?: 'recipes_var_pop_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "recipes" */
export type Recipes_Var_Pop_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Recipes_Var_Samp_Fields = {
  __typename?: 'recipes_var_samp_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "recipes" */
export type Recipes_Var_Samp_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Recipes_Variance_Fields = {
  __typename?: 'recipes_variance_fields';
  preparation_time?: Maybe<Scalars['Float']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  servings?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "recipes" */
export type Recipes_Variance_Order_By = {
  preparation_time?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  servings?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table in a streaming manner: "categories" */
  categories_stream: Array<Categories>;
  /** fetch data from the table: "ingredients" */
  ingredients: Array<Ingredients>;
  /** fetch aggregated fields from the table: "ingredients" */
  ingredients_aggregate: Ingredients_Aggregate;
  /** fetch data from the table: "ingredients" using primary key columns */
  ingredients_by_pk?: Maybe<Ingredients>;
  /** fetch data from the table in a streaming manner: "ingredients" */
  ingredients_stream: Array<Ingredients>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** fetch data from the table: "recipe_bookmarks" using primary key columns */
  recipe_bookmarks_by_pk?: Maybe<Recipe_Bookmarks>;
  /** fetch data from the table in a streaming manner: "recipe_bookmarks" */
  recipe_bookmarks_stream: Array<Recipe_Bookmarks>;
  /** An array relationship */
  recipe_categories: Array<Recipe_Categories>;
  /** An aggregate relationship */
  recipe_categories_aggregate: Recipe_Categories_Aggregate;
  /** fetch data from the table: "recipe_categories" using primary key columns */
  recipe_categories_by_pk?: Maybe<Recipe_Categories>;
  /** fetch data from the table in a streaming manner: "recipe_categories" */
  recipe_categories_stream: Array<Recipe_Categories>;
  /** An array relationship */
  recipe_comments: Array<Recipe_Comments>;
  /** An aggregate relationship */
  recipe_comments_aggregate: Recipe_Comments_Aggregate;
  /** fetch data from the table: "recipe_comments" using primary key columns */
  recipe_comments_by_pk?: Maybe<Recipe_Comments>;
  /** fetch data from the table in a streaming manner: "recipe_comments" */
  recipe_comments_stream: Array<Recipe_Comments>;
  /** An array relationship */
  recipe_images: Array<Recipe_Images>;
  /** An aggregate relationship */
  recipe_images_aggregate: Recipe_Images_Aggregate;
  /** fetch data from the table: "recipe_images" using primary key columns */
  recipe_images_by_pk?: Maybe<Recipe_Images>;
  /** fetch data from the table in a streaming manner: "recipe_images" */
  recipe_images_stream: Array<Recipe_Images>;
  /** An array relationship */
  recipe_ingredients: Array<Recipe_Ingredients>;
  /** An aggregate relationship */
  recipe_ingredients_aggregate: Recipe_Ingredients_Aggregate;
  /** fetch data from the table: "recipe_ingredients" using primary key columns */
  recipe_ingredients_by_pk?: Maybe<Recipe_Ingredients>;
  /** fetch data from the table in a streaming manner: "recipe_ingredients" */
  recipe_ingredients_stream: Array<Recipe_Ingredients>;
  /** An array relationship */
  recipe_likes: Array<Recipe_Likes>;
  /** An aggregate relationship */
  recipe_likes_aggregate: Recipe_Likes_Aggregate;
  /** fetch data from the table: "recipe_likes" using primary key columns */
  recipe_likes_by_pk?: Maybe<Recipe_Likes>;
  /** fetch data from the table in a streaming manner: "recipe_likes" */
  recipe_likes_stream: Array<Recipe_Likes>;
  /** An array relationship */
  recipe_purchases: Array<Recipe_Purchases>;
  /** An aggregate relationship */
  recipe_purchases_aggregate: Recipe_Purchases_Aggregate;
  /** fetch data from the table: "recipe_purchases" using primary key columns */
  recipe_purchases_by_pk?: Maybe<Recipe_Purchases>;
  /** fetch data from the table in a streaming manner: "recipe_purchases" */
  recipe_purchases_stream: Array<Recipe_Purchases>;
  /** An array relationship */
  recipe_ratings: Array<Recipe_Ratings>;
  /** An aggregate relationship */
  recipe_ratings_aggregate: Recipe_Ratings_Aggregate;
  /** fetch data from the table: "recipe_ratings" using primary key columns */
  recipe_ratings_by_pk?: Maybe<Recipe_Ratings>;
  /** fetch data from the table in a streaming manner: "recipe_ratings" */
  recipe_ratings_stream: Array<Recipe_Ratings>;
  /** An array relationship */
  recipe_steps: Array<Recipe_Steps>;
  /** An aggregate relationship */
  recipe_steps_aggregate: Recipe_Steps_Aggregate;
  /** fetch data from the table: "recipe_steps" using primary key columns */
  recipe_steps_by_pk?: Maybe<Recipe_Steps>;
  /** fetch data from the table in a streaming manner: "recipe_steps" */
  recipe_steps_stream: Array<Recipe_Steps>;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  /** fetch data from the table: "recipes" using primary key columns */
  recipes_by_pk?: Maybe<Recipes>;
  /** fetch data from the table in a streaming manner: "recipes" */
  recipes_stream: Array<Recipes>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootCategories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootIngredientsArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Ingredients_Order_By>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootIngredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootIngredients_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Ingredients_Stream_Cursor_Input>>;
  where?: InputMaybe<Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Subscription_RootRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Subscription_RootRecipe_Bookmarks_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Bookmarks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Bookmarks_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


export type Subscription_RootRecipe_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


export type Subscription_RootRecipe_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Categories_Order_By>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


export type Subscription_RootRecipe_Categories_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Categories_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Categories_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Categories_Bool_Exp>;
};


export type Subscription_RootRecipe_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


export type Subscription_RootRecipe_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


export type Subscription_RootRecipe_Comments_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Comments_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Comments_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


export type Subscription_RootRecipe_ImagesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


export type Subscription_RootRecipe_Images_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Images_Order_By>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


export type Subscription_RootRecipe_Images_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Images_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Images_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Images_Bool_Exp>;
};


export type Subscription_RootRecipe_IngredientsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ingredients_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ingredients_Order_By>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_Ingredients_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Ingredients_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Ingredients_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Ingredients_Bool_Exp>;
};


export type Subscription_RootRecipe_LikesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


export type Subscription_RootRecipe_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


export type Subscription_RootRecipe_Likes_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Likes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


export type Subscription_RootRecipe_PurchasesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


export type Subscription_RootRecipe_Purchases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


export type Subscription_RootRecipe_Purchases_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Purchases_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Purchases_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


export type Subscription_RootRecipe_RatingsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


export type Subscription_RootRecipe_Ratings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


export type Subscription_RootRecipe_Ratings_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Ratings_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Ratings_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


export type Subscription_RootRecipe_StepsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


export type Subscription_RootRecipe_Steps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Steps_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Steps_Order_By>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


export type Subscription_RootRecipe_Steps_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipe_Steps_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipe_Steps_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipe_Steps_Bool_Exp>;
};


export type Subscription_RootRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootRecipes_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRecipes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Recipes_Stream_Cursor_Input>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email: Scalars['String']['output'];
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  password_hash: Scalars['String']['output'];
  profile_picture?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  recipe_bookmarks: Array<Recipe_Bookmarks>;
  /** An aggregate relationship */
  recipe_bookmarks_aggregate: Recipe_Bookmarks_Aggregate;
  /** An array relationship */
  recipe_comments: Array<Recipe_Comments>;
  /** An aggregate relationship */
  recipe_comments_aggregate: Recipe_Comments_Aggregate;
  /** An array relationship */
  recipe_likes: Array<Recipe_Likes>;
  /** An aggregate relationship */
  recipe_likes_aggregate: Recipe_Likes_Aggregate;
  /** An array relationship */
  recipe_purchases: Array<Recipe_Purchases>;
  /** An aggregate relationship */
  recipe_purchases_aggregate: Recipe_Purchases_Aggregate;
  /** An array relationship */
  recipe_ratings: Array<Recipe_Ratings>;
  /** An aggregate relationship */
  recipe_ratings_aggregate: Recipe_Ratings_Aggregate;
  /** An array relationship */
  recipes: Array<Recipes>;
  /** An aggregate relationship */
  recipes_aggregate: Recipes_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username: Scalars['String']['output'];
};


/** columns and relationships of "users" */
export type UsersRecipe_BookmarksArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Bookmarks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Bookmarks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Bookmarks_Order_By>>;
  where?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Comments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Comments_Order_By>>;
  where?: InputMaybe<Recipe_Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_LikesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Likes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Likes_Order_By>>;
  where?: InputMaybe<Recipe_Likes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_PurchasesArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Purchases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Purchases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Purchases_Order_By>>;
  where?: InputMaybe<Recipe_Purchases_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_RatingsArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipe_Ratings_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipe_Ratings_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipe_Ratings_Order_By>>;
  where?: InputMaybe<Recipe_Ratings_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipesArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRecipes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Recipes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Recipes_Order_By>>;
  where?: InputMaybe<Recipes_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  bio?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  password_hash?: InputMaybe<String_Comparison_Exp>;
  profile_picture?: InputMaybe<String_Comparison_Exp>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Bool_Exp>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Bool_Exp>;
  recipe_comments?: InputMaybe<Recipe_Comments_Bool_Exp>;
  recipe_comments_aggregate?: InputMaybe<Recipe_Comments_Aggregate_Bool_Exp>;
  recipe_likes?: InputMaybe<Recipe_Likes_Bool_Exp>;
  recipe_likes_aggregate?: InputMaybe<Recipe_Likes_Aggregate_Bool_Exp>;
  recipe_purchases?: InputMaybe<Recipe_Purchases_Bool_Exp>;
  recipe_purchases_aggregate?: InputMaybe<Recipe_Purchases_Aggregate_Bool_Exp>;
  recipe_ratings?: InputMaybe<Recipe_Ratings_Bool_Exp>;
  recipe_ratings_aggregate?: InputMaybe<Recipe_Ratings_Aggregate_Bool_Exp>;
  recipes?: InputMaybe<Recipes_Bool_Exp>;
  recipes_aggregate?: InputMaybe<Recipes_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "username" */
  UsersUsernameKey = 'users_username_key'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['String']['input']>;
  recipe_bookmarks?: InputMaybe<Recipe_Bookmarks_Arr_Rel_Insert_Input>;
  recipe_comments?: InputMaybe<Recipe_Comments_Arr_Rel_Insert_Input>;
  recipe_likes?: InputMaybe<Recipe_Likes_Arr_Rel_Insert_Input>;
  recipe_purchases?: InputMaybe<Recipe_Purchases_Arr_Rel_Insert_Input>;
  recipe_ratings?: InputMaybe<Recipe_Ratings_Arr_Rel_Insert_Input>;
  recipes?: InputMaybe<Recipes_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  profile_picture?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  bio?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  password_hash?: Maybe<Scalars['String']['output']>;
  profile_picture?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  bio?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password_hash?: InputMaybe<Order_By>;
  profile_picture?: InputMaybe<Order_By>;
  recipe_bookmarks_aggregate?: InputMaybe<Recipe_Bookmarks_Aggregate_Order_By>;
  recipe_comments_aggregate?: InputMaybe<Recipe_Comments_Aggregate_Order_By>;
  recipe_likes_aggregate?: InputMaybe<Recipe_Likes_Aggregate_Order_By>;
  recipe_purchases_aggregate?: InputMaybe<Recipe_Purchases_Aggregate_Order_By>;
  recipe_ratings_aggregate?: InputMaybe<Recipe_Ratings_Aggregate_Order_By>;
  recipes_aggregate?: InputMaybe<Recipes_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  ProfilePicture = 'profile_picture',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  bio?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  password_hash?: InputMaybe<Scalars['String']['input']>;
  profile_picture?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  PasswordHash = 'password_hash',
  /** column name */
  ProfilePicture = 'profile_picture',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Username = 'username'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'mutation_root', login?: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'AuthUser', id: string, username: string, email: string, full_name: string } } | null };

export type RegisterMutationVariables = Exact<{
  full_name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'mutation_root', register?: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'AuthUser', id: string, username: string, email: string, full_name: string } } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: string, username: string, email: string, full_name?: string | null, created_at?: any | null, updated_at?: any | null }> };

export type GetAllRecipesQueryVariables = Exact<{
  where?: InputMaybe<Recipes_Bool_Exp>;
  order_by?: InputMaybe<Array<Recipes_Order_By> | Recipes_Order_By>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllRecipesQuery = { __typename?: 'query_root', recipes: Array<{ __typename?: 'recipes', id: string, title: string, description?: string | null, difficulty?: string | null, servings?: number | null, preparation_time: number, featured_image: string, price?: number | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null, recipe_steps: Array<{ __typename?: 'recipe_steps', id: string, step_number: number, description: string, image_url?: string | null }>, recipe_ingredients: Array<{ __typename?: 'recipe_ingredients', id: string, quantity: string, unit?: string | null, ingredient?: { __typename?: 'ingredients', id: string, name?: string | null } | null }>, recipe_categories: Array<{ __typename?: 'recipe_categories', id: string, category?: { __typename?: 'categories', id: string, name: string } | null }>, recipe_images: Array<{ __typename?: 'recipe_images', id: string, image_url: string, is_featured?: boolean | null }>, recipe_likes_aggregate: { __typename?: 'recipe_likes_aggregate', aggregate?: { __typename?: 'recipe_likes_aggregate_fields', count: number } | null }, recipe_likes: Array<{ __typename?: 'recipe_likes', user_id?: string | null }>, recipe_bookmarks: Array<{ __typename?: 'recipe_bookmarks', user_id?: string | null }>, recipe_ratings_aggregate: { __typename?: 'recipe_ratings_aggregate', aggregate?: { __typename?: 'recipe_ratings_aggregate_fields', count: number, avg?: { __typename?: 'recipe_ratings_avg_fields', rating?: number | null } | null } | null } }>, recipes_aggregate: { __typename?: 'recipes_aggregate', aggregate?: { __typename?: 'recipes_aggregate_fields', count: number } | null } };

export type GetRecipeByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetRecipeByIdQuery = { __typename?: 'query_root', recipes_by_pk?: { __typename?: 'recipes', id: string, title: string, description?: string | null, difficulty?: string | null, servings?: number | null, preparation_time: number, featured_image: string, price?: number | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null, recipe_steps: Array<{ __typename?: 'recipe_steps', id: string, step_number: number, description: string, image_url?: string | null }>, recipe_ingredients: Array<{ __typename?: 'recipe_ingredients', id: string, quantity: string, unit?: string | null, ingredient?: { __typename?: 'ingredients', id: string, name?: string | null } | null }>, recipe_categories: Array<{ __typename?: 'recipe_categories', id: string, category?: { __typename?: 'categories', id: string, name: string } | null }>, recipe_images: Array<{ __typename?: 'recipe_images', id: string, image_url: string, is_featured?: boolean | null }>, recipe_likes_aggregate: { __typename?: 'recipe_likes_aggregate', aggregate?: { __typename?: 'recipe_likes_aggregate_fields', count: number } | null }, recipe_likes: Array<{ __typename?: 'recipe_likes', user_id?: string | null }>, recipe_bookmarks: Array<{ __typename?: 'recipe_bookmarks', user_id?: string | null }>, recipe_ratings_aggregate: { __typename?: 'recipe_ratings_aggregate', aggregate?: { __typename?: 'recipe_ratings_aggregate_fields', count: number, avg?: { __typename?: 'recipe_ratings_avg_fields', rating?: number | null } | null } | null }, recipe_comments: Array<{ __typename?: 'recipe_comments', id: string, content: string, created_at?: any | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null }> } | null };

export type GetUserBookmarksQueryVariables = Exact<{
  user_id: Scalars['String']['input'];
}>;


export type GetUserBookmarksQuery = { __typename?: 'query_root', recipe_bookmarks: Array<{ __typename?: 'recipe_bookmarks', recipe?: { __typename?: 'recipes', id: string, title: string, description?: string | null, featured_image: string, price?: number | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null, recipe_likes_aggregate: { __typename?: 'recipe_likes_aggregate', aggregate?: { __typename?: 'recipe_likes_aggregate_fields', count: number } | null }, recipe_ratings_aggregate: { __typename?: 'recipe_ratings_aggregate', aggregate?: { __typename?: 'recipe_ratings_aggregate_fields', avg?: { __typename?: 'recipe_ratings_avg_fields', rating?: number | null } | null } | null } } | null }> };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteRecipeMutation = { __typename?: 'mutation_root', delete_recipes_by_pk?: { __typename?: 'recipes', id: string } | null };

export type LikeRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type LikeRecipeMutation = { __typename?: 'mutation_root', insert_recipe_likes_one?: { __typename?: 'recipe_likes', id: string, recipe?: { __typename?: 'recipes', recipe_likes_aggregate: { __typename?: 'recipe_likes_aggregate', aggregate?: { __typename?: 'recipe_likes_aggregate_fields', count: number } | null } } | null } | null };

export type UnlikeRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type UnlikeRecipeMutation = { __typename?: 'mutation_root', delete_recipe_likes?: { __typename?: 'recipe_likes_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'recipe_likes', recipe?: { __typename?: 'recipes', recipe_likes_aggregate: { __typename?: 'recipe_likes_aggregate', aggregate?: { __typename?: 'recipe_likes_aggregate_fields', count: number } | null } } | null }> } | null };

export type BookmarkRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type BookmarkRecipeMutation = { __typename?: 'mutation_root', insert_recipe_bookmarks_one?: { __typename?: 'recipe_bookmarks', id: string } | null };

export type UnbookmarkRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
}>;


export type UnbookmarkRecipeMutation = { __typename?: 'mutation_root', delete_recipe_bookmarks?: { __typename?: 'recipe_bookmarks_mutation_response', affected_rows: number } | null };

export type RateRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
}>;


export type RateRecipeMutation = { __typename?: 'mutation_root', insert_recipe_ratings_one?: { __typename?: 'recipe_ratings', id: string, rating: number, recipe?: { __typename?: 'recipes', recipe_ratings_aggregate: { __typename?: 'recipe_ratings_aggregate', aggregate?: { __typename?: 'recipe_ratings_aggregate_fields', count: number, avg?: { __typename?: 'recipe_ratings_avg_fields', rating?: number | null } | null } | null } } | null } | null };

export type CommentOnRecipeMutationVariables = Exact<{
  recipe_id: Scalars['String']['input'];
  user_id: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CommentOnRecipeMutation = { __typename?: 'mutation_root', insert_recipe_comments_one?: { __typename?: 'recipe_comments', id: string, content: string, created_at?: any | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null } | null };

export type GetRecipeCommentsQueryVariables = Exact<{
  recipe_id: Scalars['String']['input'];
}>;


export type GetRecipeCommentsQuery = { __typename?: 'query_root', recipe_comments: Array<{ __typename?: 'recipe_comments', id: string, content: string, created_at?: any | null, user?: { __typename?: 'users', id: string, full_name?: string | null, username: string } | null }> };

export type UpsertIngredientMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpsertIngredientMutation = { __typename?: 'mutation_root', insert_ingredients_one?: { __typename?: 'ingredients', id: string, name?: string | null } | null };

export type UpsertCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpsertCategoryMutation = { __typename?: 'mutation_root', insert_categories_one?: { __typename?: 'categories', id: string, name: string } | null };

export type GetAllIngredientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIngredientsQuery = { __typename?: 'query_root', ingredients: Array<{ __typename?: 'ingredients', id: string, name?: string | null }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'query_root', categories: Array<{ __typename?: 'categories', id: string, name: string }> };

export type CreateRecipeWithAllMutationVariables = Exact<{
  input: Recipes_Insert_Input;
}>;


export type CreateRecipeWithAllMutation = { __typename?: 'mutation_root', insert_recipes_one?: { __typename?: 'recipes', id: string, title: string, description?: string | null, difficulty?: string | null, servings?: number | null, preparation_time: number, featured_image: string, price?: number | null, user_id?: string | null, recipe_categories: Array<{ __typename?: 'recipe_categories', id: string, category?: { __typename?: 'categories', id: string, name: string } | null }>, recipe_ingredients: Array<{ __typename?: 'recipe_ingredients', id: string, quantity: string, unit?: string | null, ingredient?: { __typename?: 'ingredients', id: string, name?: string | null } | null }>, recipe_steps: Array<{ __typename?: 'recipe_steps', id: string, step_number: number, description: string, image_url?: string | null }>, recipe_images: Array<{ __typename?: 'recipe_images', id: string, image_url: string, is_featured?: boolean | null }> } | null };

export type UpdateRecipeWithAllMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: Recipes_Set_Input;
  categories: Array<Recipe_Categories_Insert_Input> | Recipe_Categories_Insert_Input;
  ingredients: Array<Recipe_Ingredients_Insert_Input> | Recipe_Ingredients_Insert_Input;
  steps: Array<Recipe_Steps_Insert_Input> | Recipe_Steps_Insert_Input;
  images: Array<Recipe_Images_Insert_Input> | Recipe_Images_Insert_Input;
}>;


export type UpdateRecipeWithAllMutation = { __typename?: 'mutation_root', update_recipes_by_pk?: { __typename?: 'recipes', id: string, title: string, description?: string | null, difficulty?: string | null, servings?: number | null, preparation_time: number, featured_image: string, price?: number | null } | null, insert_recipe_categories?: { __typename?: 'recipe_categories_mutation_response', affected_rows: number } | null, insert_recipe_ingredients?: { __typename?: 'recipe_ingredients_mutation_response', affected_rows: number } | null, insert_recipe_steps?: { __typename?: 'recipe_steps_mutation_response', affected_rows: number } | null, insert_recipe_images?: { __typename?: 'recipe_images_mutation_response', affected_rows: number } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"full_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"full_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"full_name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetAllRecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllRecipes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"recipes_bool_exp"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order_by"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipes_order_by"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order_by"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"preparation_time"}},{"kind":"Field","name":{"kind":"Name","value":"featured_image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_steps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"step_number"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"step_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_likes_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ratings_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipes_aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllRecipesQuery, GetAllRecipesQueryVariables>;
export const GetRecipeByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"preparation_time"}},{"kind":"Field","name":{"kind":"Name","value":"featured_image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_steps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"step_number"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"step_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_likes_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_likes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ratings_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeByIdQuery, GetRecipeByIdQueryVariables>;
export const GetUserBookmarksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserBookmarks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe_bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"featured_image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_likes_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ratings_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserBookmarksQuery, GetUserBookmarksQueryVariables>;
export const DeleteRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_recipes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const LikeRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_likes_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe_likes_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LikeRecipeMutation, LikeRecipeMutationVariables>;
export const UnlikeRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikeRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_recipe_likes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}},{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe_likes_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UnlikeRecipeMutation, UnlikeRecipeMutationVariables>;
export const BookmarkRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BookmarkRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_bookmarks_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BookmarkRecipeMutation, BookmarkRecipeMutationVariables>;
export const UnbookmarkRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnbookmarkRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_recipe_bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<UnbookmarkRecipeMutation, UnbookmarkRecipeMutationVariables>;
export const RateRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RateRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_ratings_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"recipe_ratings_pkey"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe_ratings_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avg"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RateRecipeMutation, RateRecipeMutationVariables>;
export const CommentOnRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommentOnRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_comments_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<CommentOnRecipeMutation, CommentOnRecipeMutationVariables>;
export const GetRecipeCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecipeComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipe_comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"recipe_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetRecipeCommentsQuery, GetRecipeCommentsQueryVariables>;
export const UpsertIngredientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertIngredient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_ingredients_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"ingredients_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpsertIngredientMutation, UpsertIngredientMutationVariables>;
export const UpsertCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_categories_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"categories_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpsertCategoryMutation, UpsertCategoryMutationVariables>;
export const GetAllIngredientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllIngredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>;
export const GetAllCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const CreateRecipeWithAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRecipeWithAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipes_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_recipes_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"preparation_time"}},{"kind":"Field","name":{"kind":"Name","value":"featured_image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"recipe_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"ingredient"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"step_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recipe_images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"is_featured"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRecipeWithAllMutation, CreateRecipeWithAllMutationVariables>;
export const UpdateRecipeWithAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRecipeWithAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipes_set_input"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipe_categories_insert_input"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ingredients"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipe_ingredients_insert_input"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"steps"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipe_steps_insert_input"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"recipe_images_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_recipes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"servings"}},{"kind":"Field","name":{"kind":"Name","value":"preparation_time"}},{"kind":"Field","name":{"kind":"Name","value":"featured_image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_ingredients"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ingredients"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"recipe_ingredients_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"quantity"},{"kind":"EnumValue","value":"unit"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_steps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"steps"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"recipe_steps_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"step_number"},{"kind":"EnumValue","value":"description"},{"kind":"EnumValue","value":"image_url"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_recipe_images"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"recipe_images_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"image_url"},{"kind":"EnumValue","value":"is_featured"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<UpdateRecipeWithAllMutation, UpdateRecipeWithAllMutationVariables>;