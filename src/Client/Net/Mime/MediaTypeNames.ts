/**
 * Provides the strings used to specify the media type.
 */
export const MediaTypeNames = Object.freeze({

	/**
	 * Specifies the kind of application data.
	 */
	Application: Object.freeze({

		/**
		 * Specifies that the application data consists of url-encoded key-value pairs.
		 */
		FormUrlEncoded: "application/x-www-form-urlencoded",

		/**
		 * Specifies that the application data is in gzip format.
		 */
		GZip: "application/gzip",

		/**
		 * Specifies that the application data is in JSON format.
		 */
		Json: "application/json",

		/**
		 * Specifies that the application data is in Web Application Manifest.
		 */
		Manifest: "application/manifest+json",

		/**
		 * Specifies that the application data is not interpreted.
		 */
		Octet: "application/octet-stream",

		/**
		 * Specifies that the application data is in Portable Document Format (PDF).
		 */
		Pdf: "application/pdf",

		/**
		 * Specifies that the application data is a SOAP document.
		 */
		Soap: "application/soap+xml",

		/**
		 * Specifies that the application data is in WASM format.
		 */
		Wasm: "application/wasm",

		/**
		 * Specifies that the application data is in XML format.
		 */
		Xml: "application/xml",

		/**
		 * Specifies that the application data is compressed.
		 */
		Zip: "application/zip"
	}),

	/**
	 * Specifies the kind of font data.
	 */
	Font: Object.freeze({

		/**
		 * Specifies that the font data is in TrueType font (TTF) format.
		 */
		Ttf: "font/ttf",

		/**
		 * Specifies that the font data is in WOFF format.
		 */
		Woff: "font/woff",

		/**
		 * Specifies that the font data is in WOFF2 format.
		 */
		Woff2: "font/woff2"
	}),

	/**
	 * Specifies the kind of image data.
	 */
	Image: Object.freeze({

		/**
		 * Specifies that the image data is in AVIF format.
		 */
		Avif: "image/avif",

		/**
		 * Specifies that the image data is in GIF format.
		 */
		Gif: "image/gif",

		/**
		 * Specifies that the image data is in ICO format.
		 */
		Icon: "image/x-icon",

		/**
		 * Specifies that the image data is in JPEG format.
		 */
		Jpeg: "image/jpeg",

		/**
		 * Specifies that the image data is in PNG format.
		 */
		Png: "image/png",

		/**
		 * Specifies that the image data is in SVG format.
		 */
		Svg: "image/svg+xml",

		/**
		 * Specifies that the image data is in WEBP format.
		 */
		WebP: "image/webp"
	}),

	/**
	 * Specifies the kind of multipart data.
	 */
	Multipart: Object.freeze({

		/**
		 * Specifies that the <see cref="MediaTypeNames.Multipart"/> data is in form data format.
		 */
		FormData: "multipart/form-data",

		/**
		 * Specifies that the <see cref="MediaTypeNames.Multipart"/> data is in mixed format.
		 */
		Mixed: "multipart/mixed"
	}),

	/**
	 * Specifies the kind of text data.
	 */
	Text: Object.freeze({

		/**
		 * Specifies that the text data is in CSS format.
		 */
		Css: "text/css",

		/**
		 * Specifies that the text data is in CSV format.
		 */
		Csv: "text/csv",

		/**
		 * Specifies that the text data is in event stream format.
		 */
		EventStream: "text/event-stream",

		/**
		 * Specifies that the text data is in HTML format.
		 */
		Html: "text/html",

		/**
		 * Specifies that the text data is in JavaScript format.
		 */
		JavaScript: "text/javascript",

		/**
		 * Specifies that the text data is in Markdown format.
		 */
		Markdown: "text/markdown",

		/**
		 * Specifies that the text data is in plain text format.
		 */
		Plain: "text/plain",

		/**
		 * Specifies that the text data is in XML format.
		 */
		Xml: "text/xml"
	})
});
