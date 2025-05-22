export default function TechnicalDocumentationPage() {
    return (
        <div className="max-w-none">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Technical Documentation</h1>
                <div className="h-1 w-full bg-emerald-500 rounded"></div>
            </div>

            <section className="mb-10">
                <h2 id="methodology" className="text-2xl font-semibold text-slate-800 mb-4">Methodology:</h2>
                <p className="text-slate-700 mb-4">Our approach integrates several key methodologies for UHI mask prediction:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>
                        <span className="font-semibold text-slate-800">Data Collection & Preprocessing</span>
                        - Utilizing satellite imagery (MODIS, Landsat, VIIRS, ESA WorldCover) via Google Earth Engine for LST, NDVI, NDBI, Nighttime Lights, and Land Cover. This involves cloud masking, index calculation, temporal aggregation, spatial resampling, extensive interpolation, and normalization.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-800">Feature Engineering</span>
                        - Structuring preprocessed data into spatio-temporal sequences (10 timesteps of 64x64 pixel tiles) for LST, NDVI, NDBI, and VIIRS, with UHI masks as labels, and exporting as TFRecords.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-800">Model Architecture</span>
                        - Employing a multi-input hybrid CNN-ConvLSTM model to process spatial features per timestep and learn temporal patterns across sequences.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-800">Training Process</span>
                        - Training the model on the TFRecord dataset using Adam optimizer, Focal Loss for class imbalance, and Dice Coefficient metric.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-800">Evaluation</span>
                        - Assessing model performance using confusion matrices, classification reports (precision, recall, F1-score), and Precision-Recall curve analysis.
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 id="implementation" className="text-2xl font-semibold text-slate-800 mb-4">Implementation</h2>
                <p className="text-slate-700 mb-4">Our implementation uses the following technologies:</p>

                <h3 className="text-xl font-medium text-slate-800 mb-3 mt-6">Core Technologies</h3>
                <ul className="list-disc pl-6 space-y-1 text-slate-700">
                    <li>Next.js, Python, TensorFlow/Keras, Google Earth Engine, Google Cloud.</li>

                </ul>

                <h3 className="text-xl font-medium text-slate-800 mb-3 mt-6">Data Workflow</h3>
                <p className="text-slate-700 mb-4">
                    Automated scripts for data acquisition from GEE, extensive preprocessing, index calculation, tiling, and TFRecord generation.
                </p>

                <h3 className="text-xl font-medium text-slate-800 mb-3 mt-6">Model Development</h3>
                <p className="text-slate-700 mb-4">
                    Implemented using Keras Functional API, comprising TimeDistributed CNN blocks for feature extraction from each input stream, followed by ConvLSTM layers for temporal modeling, and a Conv2DTranspose decoder with skip connections.
                </p>

                <div className="bg-slate-800 text-slate-100 p-4 rounded-md overflow-x-auto mb-6">
                    <pre className="text-sm">
                        <code>{`# Conceptual Model: Multi-Input CNN-ConvLSTM
# Inputs: LST_seq, NDVI_seq, NDBI_seq, VIIRS_seq
# Stage 1: TimeDistributed CNNs for spatial features per input
# Stage 2: Concatenate CNN outputs
# Stage 3: ConvLSTM layers for temporal patterns
# Stage 4: Upsampling Decoder with skip connections
# Output: Predicted UHI_mask (sigmoid activation)`}</code>
                    </pre>
                </div>
            </section>

            <section className="mb-10">
                <h2 id="results" className="text-2xl font-semibold text-slate-800 mb-4">Results</h2>
                <p className="text-slate-700 mb-4">The model demonstrates effective UHI mask prediction capabilities:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>
                        <span className="font-semibold text-slate-800">Performance Metrics</span>
                        - Achieved an F1-Score of 0.72 for the UHI class and an overall accuracy of 0.90 on the validation set.
                    </li>
                    <li>
                        <span className="font-semibold text-slate-800">Feature Importance</span>
                        - NDBI and LST were identified as the most influential input features.
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 id="future-work" className="text-2xl font-semibold text-slate-800 mb-4">Future Work</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                    <li>Enhance model generalization across diverse urban environments.</li>
                    <li>Develop the AI-driven mitigation recommendation component.</li>
                    <li>Integrate additional relevant datasets and extend the prediction horizon.</li>
                </ul>
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
