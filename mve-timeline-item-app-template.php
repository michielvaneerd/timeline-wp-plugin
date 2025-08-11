<?php
$theme = !empty($_GET['theme']) ? $_GET['theme'] : 'system';
$fgColor = (!empty($_GET['fg']) && preg_match("/^[a-z\d]{6}$/", $_GET['fg'])) ? $_GET['fg'] : '';
$bgColor = (!empty($_GET['bg']) && preg_match("/^[a-z\d]{6}$/", $_GET['bg'])) ? $_GET['bg'] : '';
$linkColor = (!empty($_GET['ac']) && preg_match("/^[a-z\d]{6}$/", $_GET['ac'])) ? $_GET['ac'] : '';
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo plugin_dir_url(__FILE__) . 'app.css'; ?>" type="text/css" />
    <?php
    if (!empty($fgColor) && !empty($bgColor) && !empty($linkColor)) {
        echo "<style type='text/css'>
            body {
                background-color: #$bgColor;
                color: #$fgColor;
            }
            a {
                color: #$linkColor;
            }
        </style>";
    }
    ?>
</head>

<body>

    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <h1><?php the_title(); ?></h1>

            <?php the_content(); ?>

        <?php endwhile; ?>

    <?php else : ?>

        <p>No posts found.</p>

    <?php endif; ?>
</body>

</html>