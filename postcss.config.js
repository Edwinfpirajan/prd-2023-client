import postcssPresetEnv from 'postcss-preset-env'
import rucksack from 'rucksack-css'
import cssnano from 'cssnano'

export default {
    parser: 'postcss-scss',
    plugins: [
        postcssPresetEnv({
            stage: 4,
            autoprefixer: {
                grid: 'autoplace'
            }
        }),
        rucksack(),
        cssnano({
            preset: 'default',
        })
    ]
}