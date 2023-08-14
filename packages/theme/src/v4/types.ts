/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions,
} from '@material-ui/core';
import type {
  PaletteOptions as MuiPaletteOptions,
  Palette as MuiPalette,
} from '@material-ui/core/styles/createPalette';
import { CSSProperties } from '@material-ui/styles/withStyles';
import {
  BackstagePaletteAdditions,
  BackstageThemeAdditions,
  BackstageTypography,
  PageTheme,
  PageThemeSelector,
} from '../base/types';

/**
 * The full Backstage palette.
 *
 * @public
 * @deprecated This type is deprecated, the Material UI Palette type is now always extended instead.
 */
export type BackstagePalette = MuiPalette & BackstagePaletteAdditions;

/**
 * The full Backstage palette options.
 *
 * @public
 * @deprecated This type is deprecated, the Material UI PaletteOptions type is now always extended instead.
 */
export type BackstagePaletteOptions = MuiPaletteOptions &
  BackstagePaletteAdditions;

/**
 * Backstage theme options.
 *
 * @public
 * @deprecated This type is deprecated, the Material UI ThemeOptions type is now always extended instead.
 * @remarks
 *
 * This is essentially a partial theme definition made by the user, that then
 * gets merged together with defaults and other values to form the final
 * {@link BackstageTheme}.
 *
 */
export interface BackstageThemeOptions extends MuiThemeOptions {
  palette: BackstagePaletteOptions;
  page: PageTheme;
  getPageTheme: (selector: PageThemeSelector) => PageTheme;
}

/**
 * A Backstage theme.
 *
 * @public
 * @deprecated This type is deprecated, the Material UI Theme type is now always extended instead.
 */
export interface BackstageTheme extends MuiTheme {
  palette: BackstagePalette;
  page: PageTheme;
  getPageTheme: (selector: PageThemeSelector) => PageTheme;
}

/**
 * A simpler configuration for creating a new theme that just tweaks some parts
 * of the backstage one.
 *
 * @public
 * @deprecated Use {@link BaseThemeOptionsInput} instead.
 */
export type SimpleThemeOptions = {
  palette: MuiPaletteOptions;
  defaultPageTheme?: string;
  pageTheme?: Record<string, PageTheme>;
  fontFamily?: string;
  htmlFontSize?: number;
  typography?: BackstageTypography;
};

declare module '@material-ui/core/styles/createPalette' {
  interface Palette extends BackstagePaletteAdditions {}

  interface PaletteOptions extends Partial<BackstagePaletteAdditions> {}
}

declare module '@material-ui/core/styles/createTheme' {
  interface Theme extends BackstageThemeAdditions {}

  interface ThemeOptions extends Partial<BackstageThemeAdditions> {}
}

// This fixes as type incompatibility that is caused by a variance in the declaration of
// the font weight types in the MUI v4 theme typography and styles such as through `makeStyles()`.
// The font weight in styles are defined to be `CSSProperties["fontWeight"]` from `csstype`, while the
// front weight in the typography are defined to be `React.CSSProperties["fontWeight"]` from `@types/react`.
//
// This is usually not an issue, but with a bad combination of `csstype` version and the wrong Yarn workspace
// hoisting, you can end up in a case where font weights from the theme are not assignable as styles.
//
// This makes sure that the font weights in the theme are compatible with the styles.
declare module '@material-ui/core/styles/createTypography' {
  interface Typography {
    fontWeightLight: CSSProperties['fontWeight'];
    fontWeightRegular: CSSProperties['fontWeight'];
    fontWeightMedium: CSSProperties['fontWeight'];
    fontWeightBold: CSSProperties['fontWeight'];
  }

  interface TypographyOptions {
    fontWeightLight: CSSProperties['fontWeight'];
    fontWeightRegular: CSSProperties['fontWeight'];
    fontWeightMedium: CSSProperties['fontWeight'];
    fontWeightBold: CSSProperties['fontWeight'];
  }
}
