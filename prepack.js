#!/usr/bin/env node

const fs = require( 'fs/promises' );
const { optimize } = require( 'svgo' );

const pictogramsSrcPath = `${__dirname}/src`;

const openTargetPath = ( targetPath ) => {
	return new Promise(
		( resolve ) => {
			// intenta abrir directorio destino; si no existe lo crea
			return fs.opendir(
				targetPath
			).then( ( existingTargetPath ) => {
				resolve( targetPath );
				existingTargetPath.close();
			} ).catch(
				() => {
					fs.mkdir( targetPath ).then(
						() => resolve( targetPath )
					);
				}
			);
		}
	);
}

const getLayerFiles = ( sourcePath ) => {
	return fs.readdir( sourcePath );
}

let fileCount   = 0;
let currentFile = 0;
let sourceSize  = 0;
let targetSize  = 0;

fs.readdir( pictogramsSrcPath ).then(
	( layersFolders ) => {
		const processedFolders = layersFolders.map(
			layer => {
				const sourcePath = `${pictogramsSrcPath}/${layer}`;
				const targetPathPromise = openTargetPath( sourcePath );
				const sourceFilesPromise = getLayerFiles( sourcePath );
				Promise.all(
					[
						targetPathPromise,
						sourceFilesPromise
					]
				).then( ( resolvedValues ) => {
					const [ targetPath, sourceFiles ] = resolvedValues;
					sourceFiles.forEach(
						file => {
							const srcFilePath = `${sourcePath}/${file}`;
							fs.readFile( srcFilePath ).then( fileContent => {
								const optimized = optimize(
									fileContent,
									{
										multipass: true,
										plugins: [
											{
												name: 'preset-default',
												params: {
													overrides: {
														removeViewBox: false
													}
												}
											}
										]
									}
								);
								sourceSize = sourceSize + fileContent.length;
								fileCount++;
								return fs.writeFile(
									`${targetPath}/${file}`,
									optimized.data
								).then(
									() => {
										currentFile++;
										targetSize = targetSize + optimized.data.length;
										console.log({
											fileCount,
											currentFile,
											fileName: `${targetPath}/${file}`,
											sourceSize,
											targetSize,
											compressionRatio: ( 100 - ( targetSize / sourceSize * 100 ) ).toPrecision( 4 )
										});
									}
								);
							} );
						}
					);
				} );
			}
		);
	}
);
