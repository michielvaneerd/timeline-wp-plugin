<?php

/*
 * Plugin Name: MVE Timeline
 */

add_action('init', function () {

    // https://kinsta.com/blog/wordpress-add-meta-box-to-post/
    // https://artisansweb.net/create-pluginsidebar-in-gutenberg/
    // https://kinsta.com/blog/wordpress-add-meta-box-to-post/#register-custom-meta-fields

    register_block_type(__DIR__ . '/build/blocks/year');
    //register_block_type(__DIR__ . '/build/blocks/instance');
    register_block_type(__DIR__ . '/build/blocks/intro');
    //register_block_type(__DIR__ . '/build/blocks/image');
    register_block_type(__DIR__ . '/build/blocks/links');


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
        'template' => [
            [
                'mve-timeline/year', [
                    'lock' => [
                        'move'   => true,
                        'remove' => true
                    ]
                ]
            ],
            [
                'mve-timeline/intro', [
                    'lock' => [
                        'move'   => true,
                        'remove' => true
                    ]
                ]
            ],
            [
                'mve-timeline/links', [
                    'lock' => [
                        'move'   => true,
                        'remove' => true
                    ]
                ]
            ],
        ]
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_year', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer'
    ]);

    register_post_meta('mve_timeline_item', 'mve_timeline_image', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer'
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
    register_rest_route('mve-timeline/v1', '/timelines', [
        'methods' => 'GET',
        'callback' => 'mve_timeline_rest_get_timelines'
    ]);
    register_rest_route('mve-timeline/v1', '/timelines/(?P<id>\d+)', [
        'methods' => 'GET',
        'callback' => 'mve_timeline_rest_get_timeline_items',
        'args' => [
            'id' => [
                'validate_callback' => function ($param, $request, $key) {
                    return preg_match("/^[\d]+$/", $param);
                }
            ]
        ]
    ]);
});

function mve_timeline_rest_get_timelines()
{
    $terms = get_terms([
        'taxonomy' => 'mve_timeline',
        'hide_empty' => true,
        'orderby' => 'name',
        'order' => 'asc',
        'fields' => 'all'
    ]);
    return new WP_REST_Response(['items' => $terms]);
}

function mve_timeline_rest_get_timeline_items(WP_REST_Request $request)
{
    global $wpdb;

    $dir = wp_get_upload_dir();

    $prefix = $wpdb->prefix;

    $query = "select
            {$prefix}posts.ID AS id, {$prefix}posts.post_title AS title,
            {$prefix}postmeta_year.meta_value as 'year',
            {$prefix}postmeta_intro.meta_value as 'intro',
            {$prefix}postmeta_links.meta_value as 'links',
            concat('" . $dir['baseurl'] . "/', {$prefix}postmeta_image_url.meta_value) as 'image'
        from
        {$prefix}posts
        inner join {$prefix}postmeta as {$prefix}postmeta_year on {$prefix}postmeta_year.post_id = {$prefix}posts.ID and {$prefix}postmeta_year.meta_key = 'mve_timeline_year'
        inner join {$prefix}postmeta as {$prefix}postmeta_intro on {$prefix}postmeta_intro.post_id = {$prefix}posts.ID and {$prefix}postmeta_intro.meta_key = 'mve_timeline_intro'
        left join {$prefix}postmeta as {$prefix}postmeta_image on {$prefix}postmeta_image.post_id = {$prefix}posts.ID and {$prefix}postmeta_image.meta_key = 'mve_timeline_image'
        left join {$prefix}postmeta as {$prefix}postmeta_links on {$prefix}postmeta_links.post_id = {$prefix}posts.ID and {$prefix}postmeta_links.meta_key = 'mve_timeline_links'
        left join {$prefix}postmeta as {$prefix}postmeta_image_url on {$prefix}postmeta_image_url.post_id = {$prefix}postmeta_image.meta_value and {$prefix}postmeta_image_url.meta_key = '_wp_attached_file'
        inner join {$prefix}term_relationships on {$prefix}term_relationships.object_id = {$prefix}posts.ID and {$prefix}term_relationships.term_taxonomy_id = %d
        where
        {$prefix}posts.post_status = 'publish'
        and {$prefix}posts.post_type = 'mve_timeline_item'
        order by year asc";

    $results = $wpdb->get_results($wpdb->prepare($query, $request['id']));

    // Note that all values are strings! So make sure to cast them on the client if needed.
    // We return the post ID, this can be requested by http://localhost:8000/?p=ID
    return new WP_REST_Response(['items' => $results]);
}

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


add_action('enqueue_block_assets', function() {
    if (is_admin()) {
        wp_enqueue_style(
            'mve-timeline-editor-styles',
            plugins_url('editor-styles.css', __FILE__)
        );
    }
});