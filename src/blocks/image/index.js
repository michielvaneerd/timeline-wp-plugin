import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __experimentalText as Text, ResponsiveWrapper, Button, TextControl } from '@wordpress/components';


registerBlockType('mve-timeline/image', {
    edit: ({ setAttributes, attributes }) => {
        const blockProps = useBlockProps();
        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        const imageId = meta['mve_timeline_image'];
        const imageSource = meta['mve_timeline_image_source'] ?? '';
        const image = useSelect((select) => select('core').getMedia(imageId), [imageId]);

        const updateImageId = (newValue) => {
            const obj = { ...meta, mve_timeline_image: newValue ? newValue.id : null };
            if (!newValue) {
                obj.mve_timeline_image_source = null;
            }
            setMeta(obj);
        };

        const updateImageSource = (newValue) => {
            setMeta({ ...meta, mve_timeline_image_source: newValue });
        };

        return (
            <div {...blockProps}>
                <MediaUploadCheck>
                    <div style={{ display: 'block' }}><Text upperCase={true}>Image</Text></div>

                    <MediaUpload
                        onSelect={updateImageId}
                        allowedTypes={['image']}
                        value={imageId}
                        render={({ open }) => (<>
                            {image && <div style={{ display: 'block' }}><ResponsiveWrapper naturalWidth={image.media_details.width}
                                naturalHeight={image.media_details.height}><img src={image.source_url} /></ResponsiveWrapper></div>}
                            <div style={{ display: 'block' }}>
                                {!image && <Button variant="secondary" onClick={open}>Open Media Library</Button>}
                                {image && <Button onClick={() => updateImageId(null)} isLink isDestructive>Remove image</Button>}
                            </div>

                        </>
                        )}
                    />
                </MediaUploadCheck>
                { image && <TextControl value={imageSource} onChange={updateImageSource} label="Image source" /> }
            </div>
        );
    },

    // No information saved to the block.
    // Data is saved to post meta via the hook.
    save: () => {
        return null;
    },
});