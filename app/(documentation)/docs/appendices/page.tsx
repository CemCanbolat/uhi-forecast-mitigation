import Image from "next/image";

export default function AppendicesPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Appendices</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="data-sources" className="text-2xl font-semibold text-slate-800 mb-4">Data Sources</h2>
                <div className="bg-slate-50 border border-slate-200 rounded-lg sm:p-6 mb-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead>
                                <tr>
                                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dataset Name</th>
                                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usage</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                <tr>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">MODIS/061/MOD11A1 (Terra Land Surface Temperature & Emissivity Daily Global 1km)</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">NASA MODIS</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">Land Surface Temperature (LST) for UHI detection and Urban Thermal Field Variance Index (UTFVI) calculation.</td>
                                </tr>
                                <tr>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">MODIS/061/MOD13A1 (Terra Vegetation Indices 16-Day L3 Global 500m)</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">NASA MODIS</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">Normalized Difference Vegetation Index (NDVI) as an input feature.</td>
                                </tr>
                                <tr>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">LANDSAT/LC08/C02/T1_L2 (Landsat 8 OLI/TIRS C2 L2)</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">USGS/NASA Landsat</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">Surface Reflectance (SR_B5, SR_B6 bands) for Normalized Difference Built-up Index (NDBI) calculation.</td>
                                </tr>
                                <tr>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG (VIIRS Day/Night Band Monthly Composites Version 1)</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">NOAA VIIRS</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">Nighttime Lights (NTL) intensity (avg_rad band) as an input feature.</td>
                                </tr>
                                <tr>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">ESA/WorldCover/v100 (ESA WorldCover 10m Global Land Cover Product)</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">ESA</td>
                                    <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-slate-700">Urban land cover classification (urban_class) for filtering and defining urban areas within tiles.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


            <section className="mb-10">
                <h2 id="model-architecture" className="text-2xl font-semibold text-slate-800 mb-4">Model Architecture Details</h2>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 md:p-6 mb-6">
                    <h3 className="text-lg font-medium text-slate-800 mb-3">CNN-LSTM Hybrid Model for UHI Mask Prediction</h3>
                    <p className="text-slate-700 mb-4">
                        Our model is a multi-input Convolutional Neural Network (CNN) - Long Short-Term Memory (LSTM) hybrid, designed to process sequences of satellite-derived features and predict a UHI (Urban Heat Island) mask.
                    </p>

                    <h4 className="font-medium text-slate-800 mb-2">Inputs:</h4>
                    <p className="text-slate-700 mb-4">
                        The model accepts four types of spatio-temporal data sequences as input, each corresponding to a different remote sensing product:
                    </p>
                    <ul className="list-disc pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>LST (Land Surface Temperature)</li>
                        <li>NDVI (Normalized Difference Vegetation Index)</li>
                        <li>NDBI (Normalized Difference Built-up Index)</li>
                        <li>VIIRS (Nighttime Lights)</li>
                    </ul>
                    <p className="text-slate-700 mb-4">
                        Each input sequence has a shape of <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">10 timesteps, 64 pixels height, 64 pixels width, 1 channel</code>.
                    </p>

                    <h4 className="font-medium text-slate-800 mb-2">Spatial Feature Extraction (per input type):</h4>
                    <ol className="list-decimal pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>Each of the four input streams is processed independently by a shared-weight CNN block. This block is applied at each of the 10 timesteps using <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed</code> Keras layers.</li>
                        <li>The CNN block architecture is:
                            <ul className="list-disc pl-4 md:pl-6 space-y-2 text-slate-700 mt-2">
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(Conv2D(32 filters, kernel_size=(3,3), padding='same'))</code></li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(BatchNormalization())</code></li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(ReLU())</code> - The output of this layer is captured as the first skip connection (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_64</code>, spatial dimensions 64x64 per timestep).</li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(MaxPooling2D(pool_size=(2,2)))</code> - Downsamples to 32x32.</li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(Conv2D(64 filters, kernel_size=(3,3), padding='same'))</code></li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(BatchNormalization())</code></li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(ReLU())</code> - The output of this layer is captured as the second skip connection (<code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_32</code>, spatial dimensions 32x32 per timestep).</li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">TimeDistributed(MaxPooling2D(pool_size=(2,2)))</code> - Further downsamples to 16x16 per timestep.</li>
                            </ul>
                        </li>
                    </ol>
                    <p className="text-slate-700 mb-4">
                        The final output of each CNN block (for each input type) has spatial dimensions of 64x64 per batch.
                    </p>

                    <h4 className="font-medium text-slate-800 mb-2">Feature Merging:</h4>
                    <ol className="list-decimal pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>The 64x64 spatial feature maps from the four independent CNN blocks (one for each input type: LST, NDVI, NDBI, VIIRS) are concatenated along the feature axis. This results in a merged feature map with richer information per timestep.</li>
                        <li>Similarly, the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_64</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_32</code> features from all four input streams are concatenated along their feature axes respectively.</li>
                    </ol>

                    <h4 className="font-medium text-slate-800 mb-2">Temporal Modeling (ConvLSTM):</h4>
                    <ol className="list-decimal pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>The merged 16x16 feature sequence is fed into a stack of two <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">ConvLSTM2D</code> layers:
                            <ul className="list-disc pl-4 md:pl-6 space-y-2 text-slate-700 mt-2">
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">ConvLSTM2D(64 filters, kernel_size=(3,3), padding='same', activation='relu', return_sequences=True)</code></li>
                                <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">ConvLSTM2D(64 filters, kernel_size=(3,3), padding='same', activation='relu', return_sequences=False)</code> - This layer outputs only the features from the last timestep.</li>
                            </ul>
                        </li>
                        <li>A <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Dropout(0.4)</code> layer is applied after the ConvLSTM stack for regularization.</li>
                    </ol>

                    <h4 className="font-medium text-slate-800 mb-2">Upsampling Decoder with Skip Connections:</h4>
                    <p className="text-slate-700 mb-4">
                        The model then upsamples the features from the ConvLSTM output back to the original 64x64 spatial resolution, incorporating the skip connection features (from the <em>last timestep</em> of the CNN blocks) to retain finer spatial details:
                    </p>
                    <ol className="list-decimal pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Conv2DTranspose(64 filters, kernel_size=(3,3), strides=2, padding='same')</code> - Upsamples to 32x32.</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Concatenate</code> with the (concatenated) <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_32</code> features (from the last timestep: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skips_32[:, -1]</code>).</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Conv2D(64 filters, kernel_size=(3,3), padding='same', activation='relu')</code>.</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Conv2DTranspose(32 filters, kernel_size=(3,3), strides=2, padding='same')</code> - Upsamples to 64x64.</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Concatenate</code> with the (concatenated) <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skip_64</code> features (from the last timestep: <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">skips_64[:, -1]</code>).</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Conv2D(32 filters, kernel_size=(3,3), padding='same', activation='relu')</code>.</li>
                    </ol>

                    <h4 className="font-medium text-slate-800 mb-2">Output Layer:</h4>
                    <ol className="list-decimal pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>A final <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Conv2D(1 filter, kernel_size=(1,1), activation='sigmoid')</code> layer produces the UHI mask prediction. The output is a single-channel 64x64 image where each pixel value represents the probability of being part of a UHI.</li>
                    </ol>

                    <h4 className="font-medium text-slate-800 mb-2">Training Details:</h4>
                    <ul className="list-disc pl-4 md:pl-6 space-y-2 text-slate-700 mb-4">
                        <li>The model is compiled using the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">Adam</code> optimizer.</li>
                        <li>A custom <code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">focal_loss</code> (with gamma=2.0, alpha=0.8) is used as the loss function to handle class imbalance in the UHI mask.</li>
                        <li><code className="bg-slate-100 px-1 py-0.5 rounded text-xs md:text-sm break-all">dice_coefficient</code> is used as an additional evaluation metric.</li>
                        <li>Class weights are computed and applied during training to further address data imbalance.</li>
                    </ul>
                </div>
            </section>


            <div className="flex justify-center mb-10">
                <Image
                    src="/images/keras.png"
                    alt="Keras Model Architecture"
                    width={800}
                    height={500}
                    className="border border-slate-200 rounded-lg shadow-sm"
                />
            </div>

            <section className="mb-10">
                <h2 id="performance-metrics" className="text-2xl font-semibold text-slate-800 mb-4">Performance Metrics and Validation</h2>
                <div className="bg-slate-50 border border-slate-200 rounded-lg sm:p-6  mb-6">
                    <div className="bg-white border border-slate-200 rounded-lg p-2 sm:mb-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead>
                                    <tr>
                                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-slate-500"></th>
                                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-slate-500">Precision</th>
                                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-slate-500">Recall</th>
                                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-slate-500">F1-Score</th>
                                        <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs font-medium text-slate-500">Support</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700 font-medium">0.0</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.96</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.92</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.94</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">329,474</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700 font-medium">1.0</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.65</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.82</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.72</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">63,742</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700 font-medium">Accuracy</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700"></td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700"></td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.90</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">393,216</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700 font-medium">Macro Avg</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.81</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.87</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">0.83</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-slate-700">393,216</td>
                                    </tr>
                                    <tr className="bg-emerald-50">
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-emerald-800 font-bold">Weighted Avg</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-emerald-800 font-medium">0.91</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-emerald-800 font-medium">0.90</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-emerald-800 font-medium">0.90</td>
                                        <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-emerald-800 font-medium">393,216</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-10 pt-6 border-t border-slate-200">
                <a
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                >
                    Back to Documentation Home
                </a>
            </div>
        </div>
    )
}