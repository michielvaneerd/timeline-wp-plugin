<!DOCTYPE html>
<html>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__) . 'app.css'; ?>" type="text/css" />
</head>
<body>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<?php
$meta = get_post_meta(get_the_ID());
$year = $meta['mve_timeline_year'][0];
$intro = $meta['mve_timeline_intro'][0];
$image = wp_get_attachment_image($meta['mve_timeline_image'][0], 'full', false, ['class' => 'img-responsive']);
?>

<h2><?php echo $year; ?></h2>

<h3><?php the_title(); ?></h3>

<p><?php echo $intro; ?></p>

<p><?php echo $image; ?></p>

<?php the_content(); ?>

<?php endwhile; ?>

<?php else: ?>

<p>No posts found.</p>

<?php endif; ?>
</body>
</html>