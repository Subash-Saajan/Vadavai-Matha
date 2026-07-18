/**
 * Vintage corner ornaments — the three vector corners from the artwork the
 * client supplied (Vecteezy "abstract vintage corner" set, converted from the
 * original EPS to true SVG paths, so they stay razor-sharp at any size).
 *
 * The art is drawn as a TOP-LEFT corner. `OrnamentFrame` places one in each
 * corner of a `relative` parent, mirroring it across the horizontal and/or
 * vertical axis so the scrollwork always curls inward.
 *
 * Every path is `fill="currentColor"`, so the colour is set once by a `text-*`
 * class on the wrapper (the site's gold) rather than baked into the asset.
 *
 * Decorative only: the layer is `aria-hidden` and `pointer-events-none`.
 *
 * NOTE ON LICENCE: if these were downloaded under the Vecteezy FREE licence,
 * the site must credit "Vecteezy.com" with a link (a footer credit is fine).
 */

import type { CSSProperties } from "react";

export type OrnamentVariant = 1 | 2 | 3;

type Ornament = { viewBox: string; transform: string; paths: string[] };

const ORNAMENTS: Record<OrnamentVariant, Ornament> = {
  1: {
    viewBox: "0 0 1292.27 1292.26",
    transform: "translate(1687.14 1437.87) scale(1 -1)",
    paths: [
      "M-496.16 1410.46C-585.92 1417.94 -639.59 1341.86 -639.59 1341.86C-508.64 1437.87 -458.03 1296.26 -542.30 1299.44C-624.63 1302.57 -732.15 1247.38 -732.15 1247.38C-787.32 1306.30 -867.76 1268.27 -867.76 1268.27C-867.76 1268.27 -881.49 1331.88 -926.40 1309.46C-971.28 1287.00 -992.48 1230.86 -992.48 1230.86C-1001.21 1257.07 -1064.81 1330.66 -1177.03 1283.27C-1289.29 1235.83 -1325.44 1326.89 -1325.44 1326.89C-1342.90 1224.61 -1242.35 1183.00 -1242.35 1183.00C-1242.35 1183.00 -1259.36 1141.08 -1213.18 1117.38C-1167.08 1093.71 -1105.96 1139.82 -1105.96 1139.82C-1197.01 1118.62 -1189.50 1240.82 -1114.69 1225.87C-1039.88 1210.94 -1013.68 1109.91 -1108.47 1050.05C-1203.26 990.19 -1314.22 1068.73 -1327.95 1142.34C-1341.64 1215.89 -1375.35 1306.94 -1397.77 1306.94C-1420.20 1306.94 -1434.91 1249.82 -1434.91 1249.82C-1461.54 1318.98 -1568.70 1331.69 -1582.20 1333.00C-1580.90 1319.48 -1568.24 1212.29 -1499.08 1185.65C-1499.08 1185.65 -1556.17 1170.97 -1556.20 1148.51C-1556.20 1126.09 -1465.14 1092.39 -1391.59 1078.69C-1317.99 1064.98 -1239.45 953.99 -1299.31 859.21C-1359.18 764.41 -1460.18 790.63 -1475.13 865.43C-1490.08 940.24 -1367.87 947.75 -1389.07 856.71C-1389.07 856.71 -1342.96 917.82 -1366.61 963.96C-1390.33 1010.10 -1432.27 993.09 -1432.27 993.09C-1432.27 993.09 -1473.87 1093.65 -1576.14 1076.17C-1576.14 1076.17 -1485.09 1040.02 -1532.48 927.80C-1579.88 815.58 -1506.32 751.96 -1480.12 743.23C-1480.12 743.23 -1536.25 722.03 -1558.71 677.15C-1581.13 632.23 -1517.54 618.50 -1517.54 618.50C-1517.54 618.50 -1555.53 538.10 -1496.63 482.88C-1496.63 482.88 -1551.83 375.37 -1548.69 293.06C-1545.51 208.77 -1687.14 259.38 -1591.12 390.32C-1591.12 390.32 -1667.16 336.72 -1659.71 246.92C-1652.21 157.12 -1519.58 145.61 -1508.80 243.17C-1500.30 320.33 -1525.01 366.61 -1435.24 453.93C-1435.24 453.93 -1390.33 396.57 -1296.83 465.13C-1203.29 533.72 -1129.71 694.58 -1167.11 814.33C-1167.11 814.33 -1178.66 742.93 -1221.68 718.60C-1264.68 694.27 -1261.90 672.78 -1261.90 672.78C-1261.90 672.78 -1326.43 722.35 -1391.88 666.22C-1457.34 610.10 -1414.34 535.29 -1367.58 576.42C-1367.58 576.42 -1404.98 602.65 -1382.56 626.93C-1360.10 651.24 -1292.56 608.38 -1332.95 553.05C-1368.53 504.42 -1434.91 539.05 -1445.20 571.76C-1459.49 617.28 -1457.34 662.49 -1358.21 720.46C-1259.09 778.44 -1226.35 816.82 -1194.53 884.16C-1194.53 884.16 -1148.52 807.84 -1061.67 812.41C-1057.07 899.23 -1133.41 945.27 -1133.41 945.27C-1066.07 977.10 -1027.71 1009.83 -969.72 1108.95C-911.71 1208.11 -866.50 1210.26 -821.02 1195.94C-788.28 1185.69 -753.68 1119.28 -802.31 1083.68C-857.64 1043.31 -900.50 1110.84 -876.19 1133.31C-851.88 1155.76 -825.69 1118.31 -825.69 1118.31C-784.54 1165.09 -859.36 1208.08 -915.48 1142.63C-971.61 1077.16 -922.03 1012.65 -922.03 1012.65C-922.03 1012.65 -943.53 1015.42 -967.87 972.43C-992.18 929.39 -1063.59 917.86 -1063.59 917.86C-943.83 880.44 -782.99 954.03 -714.39 1047.57C-645.83 1141.08 -703.17 1185.98 -703.17 1185.98C-615.86 1275.76 -569.59 1251.04 -492.43 1259.55C-394.87 1270.32 -406.36 1402.96 -496.16 1410.46Z",
      "M-1060.48 812.49C-1060.88 812.49 -1061.27 812.41 -1061.67 812.41C-1061.67 812.02 -1061.67 811.62 -1061.70 811.25L-1060.48 812.49Z",
    ],
  },
  2: {
    viewBox: "0 0 1290.40 1290.39",
    transform: "translate(-253.12 1391.08) scale(1 -1)",
    paths: [
      "M291.46 1171.66C253.12 1123.89 301.56 1063.35 301.56 1063.35C301.56 1063.35 389.15 1215.52 551.54 1092.67C428.70 1255.07 580.88 1342.67 580.88 1342.67C580.88 1342.67 520.33 1391.08 472.57 1352.74C424.81 1314.40 462.30 1246.95 462.30 1246.95C462.30 1246.95 422.12 1253.85 414.51 1289.32C406.91 1324.75 454.40 1349.38 408.67 1354.77C362.92 1360.15 276.41 1367.82 276.41 1367.82C276.41 1367.82 284.07 1281.30 289.45 1235.55C294.83 1189.80 319.46 1237.31 354.92 1229.71C390.36 1222.11 397.28 1181.93 397.28 1181.93C397.28 1181.93 329.80 1219.42 291.46 1171.66Z",
      "M1258.29 1304.32C1054.47 1229.65 917.91 1261.26 930.68 1296.92C943.47 1332.57 880.23 1351.41 866.11 1319.78C851.98 1288.17 886.28 1249.83 947.51 1237.04C1008.71 1224.26 1111.65 1243.77 1111.65 1243.77C977.11 1149.58 903.77 1169.10 903.77 1169.10C895.03 1218.20 833.82 1228.30 833.82 1194.65C833.82 1161.03 867.46 1144.88 867.46 1144.88C796.15 1120.66 714.07 1154.30 714.07 1154.30C714.07 1154.30 725.51 1105.19 832.95 1103.64C940.37 1102.09 1056.48 1172.47 1056.48 1172.47C1056.48 1172.47 978.44 1062.15 836.51 1037.24C694.57 1012.35 595.01 1125.38 605.76 1203.40C616.53 1281.44 686.49 1309.70 718.77 1292.22C751.08 1274.70 744.35 1237.04 744.35 1237.04C704.65 1276.74 642.77 1221.57 682.46 1181.89C722.14 1142.20 823.72 1194.00 781.36 1275.38C738.97 1356.79 634.03 1346.03 577.51 1250.51C521.01 1154.98 594.60 1049.63 594.60 1049.63C594.60 1049.63 489.24 1123.22 393.72 1066.71C298.19 1010.20 287.44 905.26 368.82 862.88C450.22 820.49 502.03 922.07 462.33 961.76C422.64 1001.46 367.49 939.56 407.18 899.88C407.18 899.88 369.50 893.15 352.01 925.43C334.52 957.72 362.77 1027.69 440.80 1038.44C518.84 1049.22 631.86 949.65 606.96 807.72C582.08 665.77 471.76 587.73 471.76 587.73C471.76 587.73 542.12 703.86 540.57 811.28C539.02 918.70 489.92 930.15 489.92 930.15C489.92 930.15 523.54 848.07 499.34 776.77C499.34 776.77 483.19 810.41 449.55 810.41C415.92 810.41 426.01 749.18 475.13 740.44C475.13 740.44 494.62 667.12 400.45 532.57C400.45 532.57 419.95 635.49 407.18 696.72C394.40 757.92 356.06 792.24 324.43 778.12C292.82 763.98 311.66 700.76 347.31 713.53C382.96 726.31 414.57 589.76 339.90 385.92C265.23 182.10 287.44 100.70 287.44 100.70C287.44 100.70 296.86 193.54 333.17 294.44C369.50 395.34 443.50 488.18 545.75 593.13C648.01 698.05 725.51 858.99 645.05 999.17C785.25 918.70 946.15 996.21 1051.10 1098.48C1156.04 1200.71 1248.89 1274.70 1349.78 1311.03C1450.69 1347.37 1543.52 1356.79 1543.52 1356.79C1543.52 1356.79 1462.12 1378.98 1258.29 1304.32Z",
    ],
  },
  3: {
    viewBox: "0 0 1252.54 1252.58",
    transform: "translate(-2028.27 1357.68) scale(1 -1)",
    paths: [
      "M2666.25 930.77C2645.94 924.60 2626.56 922.20 2608.36 922.38C2606.51 940.87 2606.05 957.62 2607.63 970.66C2615.88 1037.50 2632.29 1072.68 2632.29 1072.68C2632.29 1072.68 2638.16 1017.57 2663.94 998.79C2689.72 980.05 2698.09 1047.05 2671.06 1099.76C2779.00 1088.11 2774.18 963.62 2666.25 930.77ZM2498.25 812.42C2492.91 857.81 2477.81 899.40 2462.05 923.88C2486.51 908.14 2528.12 893.05 2573.55 887.67C2574.21 860.26 2576.71 832.79 2580.67 805.28C2553.17 809.21 2525.68 811.68 2498.25 812.42ZM2455.19 719.66C2422.29 611.77 2297.81 606.92 2286.21 714.88C2338.89 687.84 2405.94 696.22 2387.15 722.00C2368.36 747.81 2313.24 753.67 2313.24 753.67C2313.24 753.67 2348.45 770.09 2415.30 778.32C2428.36 779.92 2445.04 779.40 2463.57 777.58C2463.77 759.39 2461.33 739.98 2455.19 719.66ZM3240.93 1317.81C3201.10 1357.68 3157.72 1311.94 3161.21 1287.32C3164.71 1262.67 3190.55 1250.96 3210.47 1275.57C3210.47 1275.57 3210.47 1245.09 3154.16 1242.75C3097.92 1240.41 3044.58 1279.93 2982.93 1313.12C2906.71 1354.15 2773.52 1349.98 2675.68 1216.94C2606.05 1122.29 2577.30 1024.60 2573.68 925.84C2514.27 937.06 2475.11 971.82 2475.11 971.82C2556.01 980.05 2585.35 1058.61 2579.28 1135.06C2573.22 1211.49 2491.52 1330.71 2332.03 1290.82C2172.54 1250.96 2109.97 1344.77 2109.97 1344.77C2109.97 1344.77 2122.49 1272.85 2164.69 1240.00C2206.89 1207.18 2256.93 1229.07 2256.93 1229.07C2256.93 1229.07 2229.37 1179.59 2254.89 1148.81C2280.40 1118.03 2326.29 1088.07 2356.69 1146.62C2387.15 1205.22 2306.18 1208.74 2300.32 1167.69C2300.32 1167.69 2281.13 1207.14 2317.72 1231.97C2354.32 1256.83 2451.63 1239.23 2491.52 1157.12C2531.41 1075.03 2488.03 1026.94 2450.51 1026.94C2450.51 1026.94 2473.06 1051.85 2451.77 1079.86C2430.54 1107.88 2348.45 1075.03 2396.51 989.41C2310.93 1037.50 2278.10 955.40 2306.05 934.16C2334.07 912.92 2359.00 935.46 2359.00 935.46C2359.00 897.95 2310.93 854.53 2228.84 894.42C2146.69 934.30 2129.15 1031.64 2153.94 1068.20C2178.80 1104.76 2218.23 1085.59 2218.23 1085.59C2177.22 1079.73 2180.71 998.81 2239.33 1029.22C2297.88 1059.65 2267.88 1105.52 2237.15 1131.05C2206.36 1156.58 2156.91 1128.98 2156.91 1128.98C2156.91 1128.98 2178.73 1179.03 2145.90 1221.24C2113.06 1263.47 2041.13 1275.96 2041.13 1275.96C2041.13 1275.96 2135.02 1213.42 2095.13 1053.93C2055.24 894.40 2174.45 812.73 2250.87 806.65C2327.35 800.58 2405.94 829.91 2414.12 910.83C2414.12 910.83 2448.86 871.66 2460.14 812.23C2361.37 808.65 2263.66 779.90 2168.98 710.28C2035.99 612.43 2031.77 479.24 2072.84 403.00C2106.01 341.39 2145.50 288.06 2143.20 231.76C2140.82 175.47 2110.36 175.47 2110.36 175.47C2135.02 195.41 2123.28 221.22 2098.62 224.74C2074.03 228.24 2028.27 184.85 2068.16 144.98C2107.99 105.09 2170.16 125.04 2165.48 174.31C2160.80 223.56 2152.62 252.89 2212.10 349.90C2271.57 446.91 2233.92 471.76 2233.92 471.76C2246.12 431.44 2204.18 407.68 2170.10 411.26C2136.07 414.84 2066.98 467.50 2120.91 584.79C2154.67 658.14 2210.84 690.64 2248.23 704.69C2248.23 704.69 2261.68 612.93 2320.29 596.51C2372.45 581.92 2402.38 582.43 2464.56 661.01C2489.48 692.54 2499.44 732.60 2500.29 772.69C2570.05 761.39 2646.34 739.59 2646.34 739.59C2646.34 739.59 2624.51 815.88 2613.30 885.66C2653.33 886.47 2693.41 896.44 2724.93 921.39C2803.52 983.55 2804.05 1013.49 2789.41 1065.64C2773.00 1124.28 2681.28 1137.71 2681.28 1137.71C2695.33 1175.09 2727.76 1231.28 2801.15 1265.03C2918.45 1318.99 2971.13 1249.89 2974.69 1215.82C2978.25 1181.76 2954.51 1139.83 2914.16 1152.00C2914.16 1152.00 2939.02 1114.37 3036.07 1173.86C3133.06 1233.36 3162.40 1225.14 3211.65 1220.46C3260.90 1215.76 3280.82 1277.92 3240.93 1317.81Z",
    ],
  },
};

type GradientLine = { x1: number; y1: number; x2: number; y2: number };

/**
 * The line the gold-leaf gradient sweeps along: the ornament's outer corner to
 * its inner tip.
 *
 * It has to be `userSpaceOnUse` in the *paths'* coordinate system — i.e. the
 * original y-up PostScript space inside the flip transform. The obvious
 * alternative, `objectBoundingBox`, restarts the gradient inside every path's
 * own box, so a two-path ornament would come out in two mismatched pieces.
 * `transform` is `translate(-x0, yTop) scale(1,-1)`, which is where x0/yTop
 * come from.
 */
function gradientLine({ viewBox, transform }: Ornament): GradientLine {
  const m = /translate\((-?[\d.]+) (-?[\d.]+)\)/.exec(transform);
  const [, w, h] = [0, ...viewBox.split(" ").slice(2).map(Number)];
  if (!m) return { x1: 0, y1: 0, x2: w, y2: h };
  const x0 = -parseFloat(m[1]);
  const yTop = parseFloat(m[2]);
  return { x1: x0, y1: yTop, x2: x0 + w, y2: yTop - h };
}

const GRADIENTS: Record<OrnamentVariant, GradientLine> = {
  1: gradientLine(ORNAMENTS[1]),
  2: gradientLine(ORNAMENTS[2]),
  3: gradientLine(ORNAMENTS[3]),
};

/**
 * A single corner ornament, drawn as the top-left corner.
 *
 * The paths keep the original PostScript coordinates; `transform` flips that
 * y-up space into SVG's y-down space and shifts it to the origin. Without it
 * the art sits far outside the viewBox and nothing renders.
 *
 * It fills with a gold-leaf gradient (light at the outer corner, deepening
 * inward) so the metal has some depth, and so the ornament looks the same
 * whether it sits on a white plaque or over a photograph. Pass
 * `gradient={false}` to fall back to a flat `currentColor` fill.
 */
export function CornerOrnament({
  variant = 2,
  className = "",
  style,
  gradient = true,
}: {
  variant?: OrnamentVariant;
  className?: string;
  style?: CSSProperties;
  gradient?: boolean;
}) {
  const { viewBox, transform, paths } = ORNAMENTS[variant];
  const line = GRADIENTS[variant];
  // Same id for every instance of a variant — the definitions are identical, and
  // each variant needs its own because the sweep is in that variant's own space.
  const gradientId = `ornament-gold-${variant}`;

  return (
    <svg
      viewBox={viewBox}
      fill={gradient ? `url(#${gradientId})` : "currentColor"}
      fillRule="evenodd"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" {...line}>
            <stop offset="0%" stopColor="var(--gold-light)" />
            <stop offset="45%" stopColor="var(--gold)" />
            <stop offset="100%" stopColor="var(--gold-dark)" />
          </linearGradient>
        </defs>
      )}
      <g transform={transform}>
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

const CORNERS = [
  { key: "tl", place: "top-0 left-0", flip: "none", at: "top left" },
  { key: "tr", place: "top-0 right-0", flip: "scaleX(-1)", at: "top right" },
  { key: "bl", place: "bottom-0 left-0", flip: "scaleY(-1)", at: "bottom left" },
  { key: "br", place: "bottom-0 right-0", flip: "scaleX(-1) scaleY(-1)", at: "bottom right" },
] as const;

/** Which corners to dress. "diagonal" (top-left + bottom-right) boxes a photo in less. */
export type OrnamentCorners = "all" | "diagonal";
const DIAGONAL: readonly string[] = ["tl", "br"];

/** The corner size — the ornaments read their width/height from this. */
const ORN = "var(--orn)";

/**
 * A fleuron centred on one side of the frame: a hairline that fades out at both
 * ends, with a small lozenge at its middle.
 *
 * This deliberately does NOT run corner-to-corner. A full connecting rule reads
 * as a stray line butting into the scrollwork; a fading fleuron sits in the
 * space instead of trying to close the border, and echoes the site's existing
 * `kicker` / `cross-rule` hairlines.
 */
const FLEURONS = [
  { key: "top", place: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" },
  { key: "bottom", place: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" },
  { key: "left", place: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90" },
  { key: "right", place: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-90" },
] as const;

function EdgeFleuron({ place }: { place: string }) {
  return (
    <div className={`absolute flex items-center gap-2 ${place}`}>
      <span className="h-px w-10 md:w-16 bg-linear-to-r from-transparent to-current opacity-50" />
      <span className="size-1.5 rotate-45 bg-current opacity-80" />
      <span className="h-px w-10 md:w-16 bg-linear-to-r from-current to-transparent opacity-50" />
    </div>
  );
}

/**
 * A complete ornamental frame: the four corners, plus a fleuron centred on each
 * side so the long runs between corners aren't left bare.
 *
 * Drop it inside a `relative` panel. It sits *inside* the panel edge (`inset`)
 * so the scrollwork isn't crowded against the border.
 */
export function OrnamentFrame({
  variant = 2,
  size = "[--orn:5rem] md:[--orn:8rem]",
  inset = "inset-3 md:inset-5",
  pad = "",
  corners = "all",
  fleuron = true,
  onPhoto = false,
  className,
}: {
  variant?: OrnamentVariant;
  /** Sets `--orn`, the corner size. */
  size?: string;
  /** How far inside the panel edge the frame sits. */
  inset?: string;
  /** Padding between each corner of the frame and its ornament. */
  pad?: string;
  corners?: OrnamentCorners;
  /** Centre a fleuron on each side. */
  fleuron?: boolean;
  /** Lay the ornament over a photograph: brighter gold, on a soft vignette. */
  onPhoto?: boolean;
  className?: string;
}) {
  const list = corners === "all" ? CORNERS : CORNERS.filter((c) => DIAGONAL.includes(c.key));
  const tone = className ?? (onPhoto ? "text-gold-light" : "text-gold-dark/75");

  return (
    <div className={`pointer-events-none absolute ${inset} ${size} ${tone}`} aria-hidden="true">
      {/* Over a photograph, gold can vanish into a bright patch of the picture
          (the pale floral arch behind Our Lady, say). A soft vignette under each
          corner gives the ornament something to sit on. */}
      {onPhoto &&
        list.map(({ key, place, at }) => (
          <span
            key={`vignette-${key}`}
            className={`absolute ${place}`}
            style={{
              width: "calc(var(--orn) * 2)",
              height: "calc(var(--orn) * 2)",
              background: `radial-gradient(circle at ${at}, rgba(10,19,34,0.45), transparent 72%)`,
            }}
          />
        ))}

      {fleuron && FLEURONS.map(({ key, place }) => <EdgeFleuron key={key} place={place} />)}

      {list.map(({ key, place, flip }) => (
        <div key={key} className={`absolute ${place} ${pad}`} style={{ transform: flip }}>
          <CornerOrnament
            variant={variant}
            className={onPhoto ? "block drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]" : "block"}
            style={{ width: ORN, height: ORN }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * THE SITE'S STANDARD TREATMENT FOR A FRAMED PHOTOGRAPH.
 *
 * The vintage corners, small, on a soft vignette — an accent on the picture
 * rather than a cage around it. Drop it inside the image's `relative
 * overflow-hidden` container (the parent's rounding clips the vignette, so it
 * follows the frame's radius for free).
 *
 * Use this rather than hand-rolling corners per section, so every framed image
 * on the site carries the same mark.
 */
export function PhotoOrnaments({
  variant = 2,
  corners = "all",
  size = "[--orn:3rem] md:[--orn:4rem]",
}: {
  variant?: OrnamentVariant;
  corners?: OrnamentCorners;
  size?: string;
}) {
  return (
    <OrnamentFrame
      variant={variant}
      corners={corners}
      size={size}
      inset="inset-0"
      pad="p-3 md:p-4"
      fleuron={false}
      onPhoto
    />
  );
}
