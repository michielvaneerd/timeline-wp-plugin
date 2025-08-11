import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { PanelRow, SelectControl, __experimentalText as Text, __experimentalVStack as VStack, ToolbarButton, Popover, Card, CardBody, CheckboxControl } from '@wordpress/components';
import { useSelect, useDispatch, subscribe, select, dispatch } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { BlockControls } from '@wordpress/block-editor';
import { registerFormatType, toggleFormat, applyFormat } from '@wordpress/rich-text';
import { useState } from 'react';
import { init as initImage, Widget as ImageWidget } from '../../shared/image.js';
import { init as initLinks, Widget as LinksWidget } from '../../shared/links.js';
import { init as initIntro, Widget as IntroWidget } from '../../shared/intro.js';
import { init as initYearAndTimeline, Widget as YearAndTimelineWidget } from '../../shared/year_and_timeline.js';

wp.domReady(() => {
    let locked = false;
    subscribe(() => {
        const requiredMeta = select('core/editor').getEditedPostAttribute('meta');
        const tag = select('core/editor').getEditedPostAttribute('mve_timeline');
        if (requiredMeta && tag) {
            if (!requiredMeta.mve_timeline_year || tag.length === 0 || tag[0] === 0) {
                if (!locked) {
                    locked = true;
                    dispatch('core/editor').lockPostSaving('requiredValueLock');
                }
            } else {
                if (locked) {
                    locked = false;
                    dispatch('core/editor').unlockPostSaving('requiredValueLock');
                }
            }
        }
    });
});

registerPlugin('mve-timeline', {
    render: function () {

        const postType = useSelect(
            (select) => select('core/editor').getCurrentPostType(),
            []
        );

        const postId = useSelect(
            (select) => select('core/editor').getCurrentPostId(),
            []
        );

        const [meta, setMeta] = useEntityProp('postType', postType, 'meta');

        initImage(meta, setMeta);
        initLinks(meta, setMeta);
        initIntro(meta, setMeta);
        initYearAndTimeline(meta, setMeta, postId);

        if (postType !== 'mve_timeline_item') {
            return null;
        }

        const hasContent = meta['mve_timeline_content'] ?? false;

        const updateHasContent = (newValue) => {
            setMeta({ ...meta, mve_timeline_content: newValue });
        };

        const panelStyle = {
            backgroundColor: '#F3F3F3', padding: '.4rem', width: '100%'
        };

        return (
            <PluginDocumentSettingPanel title="MVE Timeline" initialOpen={true} name="mve_timeline_panel">
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <YearAndTimelineWidget />
                        </VStack>
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <CheckboxControl
                            label="Has content"
                            checked={hasContent}
                            onChange={updateHasContent}
                        />
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <ImageWidget />
                        </VStack>
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <Text upperCase={true}>Intro</Text>
                            <IntroWidget />
                        </VStack>
                    </div>
                </PanelRow>
                <PanelRow>
                    <div style={panelStyle}>
                        <VStack>
                            <Text upperCase={true}>Links</Text>
                            <LinksWidget />
                        </VStack>
                    </div>
                </PanelRow>
            </PluginDocumentSettingPanel>
        );
    }
});

const MyPageList = ({ pages, onChange, value }) => {
    return <SelectControl style={{ minWidth: '300px' }} __nextHasNoMarginBottom value={value} label="Select page" onChange={onChange} options={pages.map(function (page) {
        return { value: page.id, label: `${page.meta.mve_timeline_year} - ${page.title.raw}` };
    })} />
};

const MyCustomButton = ({ isActive, onChange, value, activeAttributes, contentRef }) => {

    const [popoverAnchor, setPopoverAnchor] = useState(contentRef.current);
    const allowedBlocks = ['core/paragraph', 'mve-timeline/intro'];

    const postId = useSelect(
        (select) => select('core/editor').getCurrentPostId(),
        []
    );

    const selectedBlock = useSelect((select) => {
        return select('core/block-editor').getSelectedBlock();
    }, []);

    if (selectedBlock && !allowedBlocks.includes(selectedBlock.name)) {
        return null;
    }

    const currentTags = useSelect(
        (select) => select('core/editor').getEditedPostAttribute('mve_timeline'),
        []
    );

    const pages = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'mve_timeline_item', currentTags && postId ? {
            'mve_timeline': currentTags,
            'exclude': [postId]
        } : {});
    }, [currentTags, postId]);

    return (
        <BlockControls>
            <ToolbarButton
                icon="admin-links"
                title="Internal link"
                onClick={() => {
                    onChange(
                        toggleFormat(value, {
                            type: 'mve-timeline/internal-link',
                        })
                    );
                }}
                isActive={isActive}
            />
            {isActive && pages && <Popover anchor={popoverAnchor} variant="toolbar"><Card><CardBody>
                <MyPageList pages={pages} value={activeAttributes?.name} onChange={(newValue) => {
                    const changed = applyFormat(value, {
                        type: 'mve-timeline/internal-link',
                        attributes: {
                            name: newValue
                        }
                    });
                    onChange(changed);
                }} />
            </CardBody></Card>
            </Popover>}
        </BlockControls>
    );
};

// const MyCustomButton2 = ({ isActive, onChange, value, activeAttributes }) => {

//     const selectedBlock = useSelect((select) => {
//         return select('core/block-editor').getSelectedBlock();
//     }, []);

//     if (selectedBlock && selectedBlock.name !== 'core/paragraph') {
//         return null;
//     }

//     console.log(selectedBlock.name);

//     return (
//         <BlockControls>
//             <ToolbarButton
//                 icon="editor-code"
//                 title="Sample output"
//                 onClick={() => {
//                     onChange(
//                         toggleFormat(value, {
//                             type: 'my-custom-format/sample-output',
//                         })
//                     );
//                 }}
//                 isActive={isActive}
//             />
//             {isActive && <Popover variant="toolbar">
//                 <URLInput value={activeAttributes.name ?? ''} onChange={(url, post) => {
//                     const newVal = applyFormat(value, {
//                         type: 'my-custom-format/sample-output',
//                         attributes: {
//                             name: url
//                         }
//                     });
//                     console.log(newVal);
//                     console.log(url);
//                     console.log(post);
//                     onChange(newVal);
//                 }} />
//             </Popover>}
//         </BlockControls>
//     );
// };

registerFormatType('mve-timeline/internal-link', {
    title: 'Internal link',
    tagName: 'a',
    className: 'mve-internal-link',
    attributes: {
        name: 'data-internal-id',
    },
    edit: MyCustomButton
});

//addFilter('editor.BlockEdit', 'mve-timeline/link', InternalLink);