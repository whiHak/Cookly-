import { gql } from '@apollo/client';

// Queries
export const GET_ALL_RECIPES = gql`
  query GetAllRecipes($where: recipes_bool_exp, $order_by: [recipes_order_by!], $limit: Int, $offset: Int) {
    recipes(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      id
      title
      description
      difficulty
      servings
      preparation_time
      featured_image
      price
      user {
        id
        full_name
        username
      }
      recipe_steps(order_by: {step_number: asc}) {
        id
        step_number
        description
        image_url
      }
      recipe_ingredients {
        id
        quantity
        unit
        ingredient {
          id
          name
        }
      }
      recipe_categories {
        id
        category {
          id
          name
        }
      }
      recipe_images {
        id
        image_url
        is_featured
      }
      recipe_likes_aggregate  {
        aggregate {
          count
        }
      }
      recipe_likes {
        user_id
      }
      recipe_bookmarks {
        user_id
      }
      recipe_ratings_aggregate {
        aggregate {
          avg {
            rating
          }
          count
        }
      }
    }
    recipes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_RECIPE_BY_ID = gql`
  query GetRecipeById($id: String!) {
    recipes_by_pk(id: $id) {
      id
      title
      description
      difficulty
      servings
      preparation_time
      featured_image
      price
      user {
        id
        full_name
        username
      }
      recipe_steps(order_by: {step_number: asc}) {
        id
        step_number
        description
        image_url
      }
      recipe_ingredients {
        id
        quantity
        unit
        ingredient {
          id
          name
        }
      }
      recipe_categories {
        id
        category {
          id
          name
        }
      }
      recipe_images {
        id
        image_url
        is_featured
      }
      recipe_likes_aggregate {
        aggregate {
          count
        }
      }
      recipe_likes {
        user_id
      }
      recipe_bookmarks {
        user_id
      }
      recipe_ratings_aggregate {
        aggregate {
          avg {
            rating
          }
          count
        }
      }
      recipe_comments(order_by: {created_at: desc}) {
        id
        content
        created_at
        user {
          id
          full_name
          username
        }
      }
    }
  }
`;

export const GET_USER_BOOKMARKS = gql`
  query GetUserBookmarks($user_id: String!) {
    recipe_bookmarks(where: {user_id: {_eq: $user_id}}) {
      recipe {
        id
        title
        description
        featured_image
        price
        user {
          id
          full_name
          username
        }
        recipe_likes_aggregate {
          aggregate {
            count
          }
        }
        recipe_ratings_aggregate {
          aggregate {
            avg {
              rating
            }
          }
        }
      }
    }
  }
`;
// Mutations

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($id: String!, $input: recipes_set_input!) {
    update_recipes_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      title
      description
      difficulty
      servings
      preparation_time
      featured_image
      price
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: String!) {
    delete_recipes_by_pk(id: $id) {
      id
    }
  }
`;

export const LIKE_RECIPE = gql`
  mutation LikeRecipe($recipe_id: String!, $user_id: String!) {
    insert_recipe_likes_one(object: {
      recipe_id: $recipe_id,
      user_id: $user_id
    }) {
      id
      recipe {
        recipe_likes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($recipe_id: String!, $user_id: String!) {
    delete_recipe_likes(where: {
      recipe_id: {_eq: $recipe_id},
      user_id: {_eq: $user_id}
    }) {
      affected_rows
      returning {
        recipe {
          recipe_likes_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;

export const BOOKMARK_RECIPE = gql`
  mutation BookmarkRecipe($recipe_id: String!, $user_id: String!) {
    insert_recipe_bookmarks_one(object: {
      recipe_id: $recipe_id,
      user_id: $user_id
    }) {
      id
    }
  }
`;

export const UNBOOKMARK_RECIPE = gql`
  mutation UnbookmarkRecipe($recipe_id: String!, $user_id: String!) {
    delete_recipe_bookmarks(where: {
      recipe_id: {_eq: $recipe_id},
      user_id: {_eq: $user_id}
    }) {
      affected_rows
    }
  }
`;

export const RATE_RECIPE = gql`
  mutation RateRecipe($recipe_id: String!, $user_id: String!, $rating: Int!) {
    insert_recipe_ratings_one(object: {
      recipe_id: $recipe_id,
      user_id: $user_id,
      rating: $rating
    }, on_conflict: {
      constraint: recipe_ratings_pkey,
      # update_columns: [rating]
    }) {
      id
      rating
      recipe {
        recipe_ratings_aggregate {
          aggregate {
            avg {
              rating
            }
            count
          }
        }
      }
    }
  }
`;

export const COMMENT_ON_RECIPE = gql`
  mutation CommentOnRecipe($recipe_id: String!, $user_id: String!, $content: String!) {
    insert_recipe_comments_one(object: {
      recipe_id: $recipe_id,
      user_id: $user_id,
      content: $content
    }) {
      id
      content
      created_at
      user {
        id
        full_name
        username
      }
    }
  }
`;

export const GET_RECIPE_COMMENTS = gql`
  query GetRecipeComments($recipe_id: String!) {
    recipe_comments(
      where: {recipe_id: {_eq: $recipe_id}}
      order_by: {created_at: desc}
    ) {
      id
      content
      created_at
      user {
        id
        full_name
        username
      }
    }
  }
`;

export const UPSERT_INGREDIENT = gql`
  mutation UpsertIngredient($id: String!, $name: String!) {
    insert_ingredients_one(
      object: { id: $id, name: $name },
      on_conflict: { constraint: ingredients_pkey, update_columns: [] }
    ) {
      id
      name
    }
  }
`;

export const UPSERT_CATEGORY = gql`
  mutation UpsertCategory($id: String!, $name: String!) {
    insert_categories_one(
      object: { id: $id, name: $name },
      on_conflict: { constraint: categories_pkey, update_columns: [] }
    ) {
      id
      name
    }
  }
`;

export const GET_ALL_INGREDIENTS = gql`
  query GetAllIngredients {
    ingredients {
      id
      name
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      id
      name
    }
  }
`;

export const UPDATE_RECIPE_IMAGE = gql`
  mutation UpdateRecipeImage($id: String!, $input: recipe_images_set_input!) {
    update_recipe_images_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      image_url
      is_featured
    }
  }
`;

export const UPDATE_RECIPE_CATEGORY = gql`
  mutation UpdateRecipeCategory($id: String!, $input: recipe_categories_set_input!) {
    update_recipe_categories_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      category_id
    }
  }
`;

export const UPDATE_RECIPE_INGREDIENT = gql`
  mutation UpdateRecipeIngredient($id: String!, $input: recipe_ingredients_set_input!) {
    update_recipe_ingredients_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      quantity
      unit
      ingredient_id
    }
  }
`;

export const UPDATE_RECIPE_STEP = gql`
  mutation UpdateRecipeStep($id: String!, $input: recipe_steps_set_input!) {
    update_recipe_steps_by_pk(pk_columns: {id: $id}, _set: $input) {
      id
      step_number
      description
      image_url
    }
  }
`;

export const CREATE_RECIPE_WITH_ALL = gql`
  mutation CreateRecipeWithAll($input: recipes_insert_input!) {
    insert_recipes_one(object: $input) {
      id
      title
      description
      difficulty
      servings
      preparation_time
      featured_image
      price
      user_id
      recipe_categories { id category { id name } }
      recipe_ingredients { id quantity unit ingredient { id name } }
      recipe_steps { id step_number description image_url }
      recipe_images { id image_url is_featured }
    }
  }
`; 