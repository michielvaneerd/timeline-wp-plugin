<!DOCTYPE html>
<html>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__) . 'app.css'; ?>" type="text/css" />
</head>
<body>

<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

<h3><?php the_title(); ?></h3>

<?php the_content(); ?>

<?php endwhile; ?>

<?php else: ?>

<p>No posts found.</p>

<?php endif; ?>
</body>
</html>