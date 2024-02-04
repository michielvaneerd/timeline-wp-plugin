import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __experimentalText as Text, ResponsiveWrapper, Button, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

let imageId, imageSource, imageInfo, image, _setMeta, _meta = null;

const updateImageId = (newValue) => {
    const obj = { ..._meta, mve_timeline_image: newValue ? newValue.id : null, mve_timeline_image_src: newValue ? JSON.stringify(newValue.sizes) : null };
    if (!newValue) {
        obj.mve_timeline_image_source = null;
        obj.mve_timeline_image_info = null;
        obj.mve_timeline_image_src = null;
    }
    _setMeta(obj);
};

const updateImageSource = (newValue) => {
    _setMeta({ ..._meta, mve_timeline_image_source: newValue });
};

const updateImageInfo = (newValue) => {
    _setMeta({ ..._meta, mve_timeline_image_info: newValue });
};

export const init = function (meta, setMeta) {
    _meta = meta;
    _setMeta = setMeta;
    imageId = meta['mve_timeline_image'];
    imageSource = meta['mve_timeline_image_source'] ?? '';
    imageInfo = meta['mve_timeline_image_info'] ?? '';
    image = useSelect((select) => select('core').getMedia(imageId), [imageId]);
};

export const Widget = function () {
    return (
        <MediaUploadCheck>
            <Text upperCase={true}>Image</Text>
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
            {image && <TextControl value={imageSource} onChange={updateImageSource} label="Source" />}
            {image && <TextControl value={imageInfo} onChange={updateImageInfo} label="Info" />}
        </MediaUploadCheck>
    );
};