import React from 'react';

export default function Stats() {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">180+</div>
                    <div className="text-gray-600">覆盖国家和地区</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">千万级</div>
                    <div className="text-gray-600">海关数据条目</div>
                </div>
                <div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">99.9%</div>
                    <div className="text-gray-600">数据准确率</div>
                </div>
            </div>
        </section>
    );
}