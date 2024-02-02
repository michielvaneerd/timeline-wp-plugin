<?php

/*
 * Plugin Name: MVE Timeline
 */

add_action('init', function () {

    // https://kinsta.com/blog/wordpress-add-meta-box-to-post/
    // https://artisansweb.net/create-pluginsidebar-in-gutenberg/
    // https://kinsta.com/blog/wordpress-add-meta-box-to-post/#register-custom-meta-fields

    //register_block_type(__DIR__ . '/build/blocks/year');
    //register_block_type(__DIR__ . '/build/blocks/instance');
    register_block_type(__DIR__ . '/build/blocks/intro');
    //register_block_type(__DIR__ . '/build/blocks/image');
    //register_block_type(__DIR__ . '/build/blocks/links');

    register_post_type('mve_timeline_item', [
        'labels' => [
            'name' => 'Timeline item'
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => [
            'title',
            'editor',
            'custom-fields',
            //'revisions',
            'thumbnail'
        ],
        // 'template' => [
        //     [
        //         'mve-timeline/year', [
        //             'lock' => [
        //                 'move'   => true,
        //                 'remove' => true
        //             ]
        //         ]
        //     ],
        //     [
        //         'mve-timeline/image', [
        //             'lock' => [
        //                 'move'   => true,
        //                 'remove' => true
        //             ]
        //         ]
        //     ],
        //     [
        //         'mve-timeline/intro', [
        //             'lock' => [
        //                 'move'   => true,
        //                 'remove' => true
        //             ]
        //         ]
        //     ],
        //     [
        //         'mve-timeline/links', [
        //             'lock' => [
        //                 'move'   => true,
        //                 'remove' => true
        //             ]
        //         ]
        //     ],
        // ],
        // 'template_lock' => 'all'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_year', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string' // Nicer to have integer, but because year_end MUST be a string (otherwise null values are not allowed and become 0)
        // we use here string as well.
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_year_end', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string' // Cannot be 'int' because this can be null, which is not allowed for 'int' types apparently...
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_image', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_image_src', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string'
    ]);

    // Als ik nu gebruik maak van featured_image, dan kan ik deze mbv gewone API calls ophalen.
    register_post_meta('mve_timeline_item', 'mve_timeline_image_source', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_image_info', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_intro', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_links', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string'
    ]);

    register_taxonomy('mve_timeline', ['mve_timeline_item'], [
        'hierarchical' => false,
        'labels' => [
            'name' => 'Timeline'
        ],
        'show_admin_column' => true,
        'show_in_rest' => true,
        'show_ui' => true,
        'public' => false,
        'show_in_nav_menus' => true,
        'show_in_menu' => true,
    ]);

    //$post_type_object = get_post_type_object( 'post' );
    //echo '<pre>'; var_dump($post_type_object); exit;

});

// For plugins:
add_action('enqueue_block_editor_assets', function () {
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/plugins/year/index.asset.php');
    wp_enqueue_script(
        'mve-timeline-year2',
        plugins_url('build/plugins/year/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );
});

add_filter('single_template', function ($template) {
    global $post;
    if ($post->post_type === 'mve_timeline_item') {
        $template = __DIR__ . '/mve-timeline-item-app-template.php';
    }
    return $template;
});

add_action('rest_api_init', function () {

    // We need to add the un-rendered title, because otherwise some characters will be rewritten to HTML entities.
    register_rest_field('mve_timeline_item', 'title_raw', [
        'get_callback' => function($arr) {
            return $arr['title']['raw'];
        },
        'schema' => [
            'type' => 'string'
        ]
    ]);

//     // register_rest_route('mve-timeline/v1', '/timelines', [
//     //     'methods' => 'GET',
//     //     'callback' => 'mve_timeline_rest_get_timelines'
//     // ]);
//     register_rest_route('mve-timeline/v1', '/items/draft', [
//         'methods' => 'GET',
//         'callback' => 'mve_timeline_rest_get_timeline_items_draft',
//         'permission_callback' => function () {
//             return current_user_can('edit_others_posts');
//         }
//     ]);
//     register_rest_route('mve-timeline/v1', '/timelines/(?P<id>[\d\,]+)', [
//         'methods' => 'GET',
//         'callback' => 'mve_timeline_rest_get_timeline_items_for_category',
//         'args' => [
//             'id' => [
//                 'validate_callback' => function ($param) {
//                     return preg_match("/^[\d\,]+$/", $param);
//                 }
//             ]
//         ],
//         'permission_callback' => function () {
//             return true;
//         }
//     ]);
});

// function mve_timeline_rest_get_timelines_new()
// {
//     global $wpdb;
//     $prefix = $wpdb->prefix;
//     $query = "select
//     {$prefix}terms.name,
//     {$prefix}term_taxonomy.term_taxonomy_id, {$prefix}term_taxonomy.count,
//         min({$prefix}postmeta_year.meta_value) as min_year,
//         max({$prefix}postmeta_year_end.meta_value) as max_year
//         from
//         {$prefix}terms
//         inner join {$prefix}term_taxonomy on {$prefix}term_taxonomy.term_id = {$prefix}terms.term_id
//         inner join {$prefix}term_relationships on {$prefix}term_relationships.term_taxonomy_id = {$prefix}term_taxonomy.term_taxonomy_id
//         inner join {$prefix}posts on {$prefix}posts.ID = {$prefix}term_relationships.object_id
//         inner join {$prefix}postmeta as {$prefix}postmeta_year on {$prefix}postmeta_year.post_id = {$prefix}posts.ID and {$prefix}postmeta_year.meta_key = 'mve_timeline_year'
//         left join {$prefix}postmeta as {$prefix}postmeta_year_end on {$prefix}postmeta_year_end.post_id = {$prefix}posts.ID and {$prefix}postmeta_year_end.meta_key = 'mve_timeline_year_end'
//         where {$prefix}posts.post_status = 'publish' and {$prefix}posts.post_type = 'mve_timeline_item'
//         group by {$prefix}term_taxonomy.term_taxonomy_id;";
//     $results = $wpdb->get_results($wpdb->prepare($query));
//     return new WP_REST_Response(['items' => $results]);
// }

// function mve_timeline_rest_get_timelines()
// {
//     $terms = get_terms([
//         'taxonomy' => 'mve_timeline',
//         'hide_empty' => false,
//         'orderby' => 'name',
//         'order' => 'asc',
//         'fields' => 'all'
//     ]);
//     return new WP_REST_Response(['items' => $terms]);
// }

// add_filter('the_content', function($content) {
//     $featuredimage = get_the_post_thumbnail();
//     return $content . $featuredimage;
// });

// Kan ook zo:
// http://localhost:8000/wp-json/wp/v2/mve_timeline_item?_embed=wp:featuredmedia&_fields=id,title,featured_media,mve_timeline,meta,_links.wp:featuredmedia
// Maar dan alleen met featured media.
// Of andere optie is om URL van de meta.image op te slaan in plaats van de media id?
// Dan kan ik alles in de meta opslaan en hoef ik niet de featured media op te halen.
// Nadeel van featured media is dat deze standaard deel uitmaakt van de content...
// https://wpsites.net/genesis-tutorials/add-featured-image-before-content-in-any-theme/????
// function _mve_timeline_rest_get_timeline_items(WP_REST_Request $request, ?array $timelineIds, ?bool $draft)
// {
//     global $wpdb;

//     $dir = wp_get_upload_dir();

//     $prefix = $wpdb->prefix;

//     $wheres = [
//         "{$prefix}posts.post_status = '%s'"
//     ];
//     $whereArgs = [
//         $draft ? 'draft' : 'publish'
//     ];

//     if (!empty($timelineIds)) {
//         $ids = implode(',', array_map(function($id) {
//             return (int)$id;
//         }, $timelineIds));
//         $wheres[] = "{$prefix}term_relationships.term_taxonomy_id in ($ids)";
//     }

//     $whereAsString = implode(' AND ', $wheres);

//     $orderBy = 'year';
//     $order = 'desc';
//     if (!empty($request['order_by'])) {
//         switch ($request['order_by']) {
//             case 'modified':
//                 $orderBy = 'post_modified';
//                 break;
//         }
//     }

//     $query = "select
//             {$prefix}posts.ID AS post_id,
//             {$prefix}posts.post_title AS title,
//             {$prefix}postmeta_year.meta_value as 'year',
//             {$prefix}postmeta_year_end.meta_value as 'year_end',
//             {$prefix}postmeta_intro.meta_value as 'intro',
//             {$prefix}postmeta_links.meta_value as 'links',
//             {$prefix}postmeta_image_source.meta_value as 'image_source',
//             {$prefix}postmeta_image_info.meta_value as 'image_info',
//             concat('" . $dir['baseurl'] . "/', {$prefix}postmeta_image_url.meta_value) as 'image',
//             {$prefix}term_relationships.term_taxonomy_id
//         from
//         {$prefix}posts
//         inner join {$prefix}postmeta as {$prefix}postmeta_year on {$prefix}postmeta_year.post_id = {$prefix}posts.ID and {$prefix}postmeta_year.meta_key = 'mve_timeline_year'
//         inner join {$prefix}postmeta as {$prefix}postmeta_intro on {$prefix}postmeta_intro.post_id = {$prefix}posts.ID and {$prefix}postmeta_intro.meta_key = 'mve_timeline_intro'
//         left join {$prefix}postmeta as {$prefix}postmeta_year_end on {$prefix}postmeta_year_end.post_id = {$prefix}posts.ID and {$prefix}postmeta_year_end.meta_key = 'mve_timeline_year_end'
//         left join {$prefix}postmeta as {$prefix}postmeta_image on {$prefix}postmeta_image.post_id = {$prefix}posts.ID and {$prefix}postmeta_image.meta_key = 'mve_timeline_image'
//         left join {$prefix}postmeta as {$prefix}postmeta_links on {$prefix}postmeta_links.post_id = {$prefix}posts.ID and {$prefix}postmeta_links.meta_key = 'mve_timeline_links'
//         left join {$prefix}postmeta as {$prefix}postmeta_image_source on {$prefix}postmeta_image_source.post_id = {$prefix}posts.ID and {$prefix}postmeta_image_source.meta_key = 'mve_timeline_image_source'
//         left join {$prefix}postmeta as {$prefix}postmeta_image_info on {$prefix}postmeta_image_info.post_id = {$prefix}posts.ID and {$prefix}postmeta_image_info.meta_key = 'mve_timeline_image_info'
//         left join {$prefix}postmeta as {$prefix}postmeta_image_url on {$prefix}postmeta_image_url.post_id = {$prefix}postmeta_image.meta_value and {$prefix}postmeta_image_url.meta_key = '_wp_attached_file'
//         inner join {$prefix}term_relationships on {$prefix}term_relationships.object_id = {$prefix}posts.ID
//         where
//         $whereAsString
//         and {$prefix}posts.post_type = 'mve_timeline_item'
//         order by $orderBy $order";


//     $results = $wpdb->get_results($wpdb->prepare($query, ...array_values($whereArgs)));

//     // Note that all values are strings! So make sure to cast them on the client if needed.
//     // We return the post ID, this can be requested by http://localhost:8000/?p=ID
//     return new WP_REST_Response(['items' => $results]);
// }

// function mve_timeline_rest_get_timeline_items_draft(WP_REST_Request $request)
// {
//     return _mve_timeline_rest_get_timeline_items($request, null, true);
// }

// function mve_timeline_rest_get_timeline_items_for_category(WP_REST_Request $request)
// {
//     // $ids = array_map(function($id) {
//     //     return (int)$id;
//     // }, explode(',', $request['id']));
//     $ids = explode(',', $request['id']);
//     return _mve_timeline_rest_get_timeline_items($request, $ids, false);
// }

add_filter('manage_mve_timeline_item_posts_columns', function ($columns) {
    return array_merge($columns, ['mve_timeline_year' => 'Year']);
});

add_action('manage_mve_timeline_item_posts_custom_column', function ($column, $post_id) {
    switch ($column) {
        case 'mve_timeline_year':
            echo get_post_meta($post_id, 'mve_timeline_year', true);
            break;
    }
}, 10, 2);

add_filter('manage_edit-mve_timeline_item_sortable_columns', function ($columns) {
    $columns['mve_timeline_year'] = 'mve_timeline_year';
    return $columns;
});

add_action('pre_get_posts', function ($query) {
    if (!is_admin()) {
        return;
    }
    $orderby = $query->get('orderby');
    if ($orderby === 'mve_timeline_year') {
        $query->set('meta_key', 'mve_timeline_year');
        $query->set('orderby', 'meta_value_num');
    }
});


add_action('enqueue_block_assets', function () {
    if (is_admin()) {
        wp_enqueue_style(
            'mve-timeline-editor-styles',
            plugins_url('editor-styles.css', __FILE__)
        );
    }
});

// add_filter('allowed_block_types', function($allowed_block_types, $post) {
//     if ($post->post_type === 'mve_timeline_item') {
//         return [
//             'mve-timeline/year',
//             'mve-timeline/image',
//             'mve-timeline/intro',
//             'mve-timeline/links'
//         ];
//     }
//     return $allowed_block_types;
// }, 10, 2);

// This can be used to prevent deletion of images that are used for timeline items.
// When return false it will prevent deletion.
add_action('pre_delete_attachment', function($delete, $post, $force_delete) {
    // Is this image used in a post meta image?
    //return false; // Return false will forbid the deletion.
}, 10, 3);