import { RichText } from '@wordpress/block-editor';

let _meta, _setMeta, metaFieldValue = null;

const updateMetaValue = (newValue) => {
    _setMeta({ ..._meta, mve_timeline_intro: newValue });
};

export const init = function (meta, setMeta) {
    _meta = meta;
    _setMeta = setMeta;
    metaFieldValue = meta['mve_timeline_intro'];
};

export const Widget = function () {
    return (
        <RichText
            placeholder="Intro..."
            allowedFormats={['core/bold', 'core/italic', 'core/link', 'mve-timeline/internal-link']}
            label="MVE Timeline Intro"
            value={metaFieldValue}
            onChange={updateMetaValue}
            style={{ backgroundColor: 'white', padding: '1rem', border: '1px solid #C0C0C0' }}
        />
    );
}