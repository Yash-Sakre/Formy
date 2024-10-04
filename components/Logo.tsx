import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {};

export function Logo(props: Props) {
  return (
    <Link href={"/"} className="">
      <svg
        width="162"
        height="51"
        viewBox="0 0 162 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.72864 34.5833C7.83804 10.7113 24.7486 3.93983 38.2824 6.26297C38.8288 14.1744 34.9579 17.1368 27.5859 18.5049C29.0094 19.9923 31.5248 21.8641 31.2534 24.204C31.0604 25.869 29.9296 26.6861 27.6681 28.32C22.712 31.9007 16.9706 34.1588 9.72864 34.5833Z"
          stroke="#141B34"
          strokeWidth="2.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.66666 44.1667C7.66666 31.7084 15.0429 25.3485 20.125 21.1667"
          stroke="#141B34"
          strokeWidth="2.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M71.672 11.4V18.164H71.178L68.442 12.692H59.132V24.168H65.25L67.036 20.748H67.568V28.88H67.036L65.25 25.46H59.132V36.024L62.552 37.468V38H52.064V37.468L55.066 35.986V13.414L52.064 11.932V11.4H71.672ZM81.764 38.456C80.0666 38.456 78.4833 38.038 77.014 37.202C75.57 36.366 74.4046 35.2007 73.518 33.706C72.6313 32.186 72.188 30.4887 72.188 28.614C72.188 26.7393 72.6313 25.0547 73.518 23.56C74.4046 22.04 75.57 20.862 77.014 20.026C78.4833 19.19 80.0666 18.772 81.764 18.772C83.4613 18.772 85.0446 19.19 86.514 20.026C87.9833 20.862 89.1613 22.04 90.048 23.56C90.9346 25.0547 91.378 26.7393 91.378 28.614C91.378 30.4887 90.9346 32.186 90.048 33.706C89.1613 35.2007 87.9833 36.366 86.514 37.202C85.0446 38.038 83.4613 38.456 81.764 38.456ZM81.764 37.202C83.3853 37.202 84.69 36.442 85.678 34.922C86.6913 33.3767 87.198 31.274 87.198 28.614C87.198 25.954 86.6913 23.864 85.678 22.344C84.69 20.7987 83.3853 20.026 81.764 20.026C80.1426 20.026 78.8253 20.7987 77.812 22.344C76.824 23.864 76.33 25.954 76.33 28.614C76.33 31.274 76.824 33.3767 77.812 34.922C78.8253 36.442 80.1426 37.202 81.764 37.202ZM105.043 18.772C106.157 18.772 107.044 19.0887 107.703 19.722C108.387 20.33 108.729 21.1153 108.729 22.078C108.729 22.8127 108.513 23.408 108.083 23.864C107.677 24.32 107.12 24.548 106.411 24.548C105.777 24.548 105.258 24.3327 104.853 23.902C104.447 23.4713 104.245 22.952 104.245 22.344C104.245 21.584 104.498 20.9253 105.005 20.368C104.802 20.3173 104.599 20.292 104.397 20.292C103.434 20.3427 102.497 20.824 101.585 21.736C100.698 22.648 100.052 23.902 99.6465 25.498V36.214L102.421 37.43V38H92.9205V37.43L95.6945 36.214V21.698L92.9205 20.596V20.026L99.2665 18.772L99.6465 19.152V22.534C100.077 21.4953 100.787 20.6087 101.775 19.874C102.763 19.1393 103.852 18.772 105.043 18.772ZM138.511 36.214L141.285 37.43V38H132.279V37.43L134.559 36.214V23.826C134.559 22.8633 134.331 22.1413 133.875 21.66C133.419 21.1533 132.773 20.9 131.937 20.9C131.202 20.9 130.48 21.1027 129.771 21.508C129.062 21.888 128.466 22.42 127.985 23.104V23.408V36.214L130.227 37.43V38H121.753V37.43L124.033 36.214V23.826C124.033 22.8633 123.805 22.1413 123.349 21.66C122.893 21.1533 122.247 20.9 121.411 20.9C120.651 20.9 119.916 21.1153 119.207 21.546C118.498 21.9513 117.915 22.5213 117.459 23.256V36.214L119.701 37.43V38H110.733V37.43L113.507 36.214V21.698L110.733 20.596V20.026L117.079 18.772L117.459 19.152V21.736C118.016 20.9253 118.789 20.2287 119.777 19.646C120.765 19.0633 121.829 18.772 122.969 18.772C124.134 18.772 125.122 19.038 125.933 19.57C126.769 20.0767 127.352 20.786 127.681 21.698C128.365 20.8367 129.214 20.14 130.227 19.608C131.266 19.0507 132.355 18.772 133.495 18.772C135.04 18.772 136.256 19.2153 137.143 20.102C138.055 20.9633 138.511 22.1667 138.511 23.712V36.214ZM154.916 19.228H160.844V19.798L158.488 21.014L151.344 40.736C150.685 42.5853 149.875 43.928 148.912 44.764C147.949 45.6253 146.771 46.056 145.378 46.056C144.365 46.056 143.567 45.8153 142.984 45.334C142.427 44.8527 142.148 44.2193 142.148 43.434C142.148 42.826 142.351 42.294 142.756 41.838C143.187 41.4073 143.731 41.192 144.39 41.192C145.226 41.192 145.847 41.458 146.252 41.99C146.683 42.522 146.898 43.282 146.898 44.27C147.582 44.042 148.152 43.662 148.608 43.13C149.064 42.598 149.52 41.7367 149.976 40.546L150.888 38H149.862L143.174 21.014L140.742 19.798V19.228H149.596V19.798L147.506 21.014L152.332 34.01L157.006 21.014L154.916 19.798V19.228Z"
          fill="#141B34"
        />
      </svg>
    </Link>
  );
}
